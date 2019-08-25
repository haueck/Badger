import { FieldValue } from "@google-cloud/firestore"
import Tags from "server/tags.mjs"

describe("Tags", () => {

  it("properly creates a tag", () => {
    return new Promise((resolve, reject) => {
      let update = jest.fn()
      let promise = Promise.resolve()
      let tags = new Tags({ database: { update } })
      update.mockReturnValue(promise)
      tags.create("Name ", "Parent", () => {
        expect(update.mock.calls.length).toEqual(1)
        expect(update.mock.calls[0][0]).toEqual({ "Tags.Name": { "Parent": "Parent", "Count": 0 } })
        resolve()
      }, () => {
        reject("Failure is not expected in this scenario")
      })
    })
  })

  it("properly handles a db error while creating a tag", () => {
    return new Promise((resolve, reject) => {
      let update = jest.fn()
      let promise = Promise.reject("error")
      let tags = new Tags({ database: { update } })
      update.mockReturnValue(promise)
      tags.create("Name", "Parent", () => {
        reject("In this scenario failure is expected")
      }, () => {
        resolve()
      })
    })
  })

  it("properly handles an invalid tag while creating a tag", () => {
    return new Promise((resolve, reject) => {
      let tags = new Tags({})
      tags.create("Name$", "Parent", () => {
        reject("In this scenario failure is expected")
      }, () => {
        resolve()
      })
    })
  })

  it("properly activates a tag", () => {
    return new Promise((resolve, reject) => {
      let update = jest.fn()
      let promise = Promise.resolve()
      let tags = new Tags({ database: { update } })
      update.mockReturnValue(promise)
      tags.activate("Name", () => {
        expect(update.mock.calls.length).toEqual(1)
        expect(update.mock.calls[0][0]).toEqual({ "Tags.Name.Inactive": FieldValue.delete() })
        resolve()
      }, () => {
        reject("Failure is not expected in this scenario")
      })
    })
  })

  it("properly handles a db error during activation", () => {
    return new Promise((resolve, reject) => {
      let update = jest.fn()
      let promise = Promise.reject("error")
      let tags = new Tags({ database: { update } })
      update.mockReturnValue(promise)
      tags.activate("Name", () => {
        reject("Failure is expected in this scenario")
      }, () => {
        resolve()
      })
    })
  })

  it("properly activates a tag", () => {
    return new Promise((resolve, reject) => {
      let update = jest.fn()
      let promise = Promise.resolve()
      let tags = new Tags({ database: { update } })
      update.mockReturnValue(promise)
      tags.deactivate("Name", () => {
        expect(update.mock.calls.length).toEqual(1)
        expect(update.mock.calls[0][0]).toEqual({ "Tags.Name.Inactive": true })
        resolve()
      }, () => {
        reject("Failure is not expected in this scenario")
      })
    })
  })

  it("properly handles a db error during deactivation", () => {
    return new Promise((resolve, reject) => {
      let update = jest.fn()
      let promise = Promise.reject("error")
      let tags = new Tags({ database: { update } })
      update.mockReturnValue(promise)
      tags.deactivate("Name", () => {
        reject("Failure is expected in this scenario")
      }, () => {
        resolve()
      })
    })
  })

  it("properly removes a tag", () => {
    return new Promise((resolve, reject) => {
      let get = jest.fn()
      let update = jest.fn()
      let database = {
        collection() {
          return {
            where() {
              return {
                get: get
              }
            }
          }
        },
        update: update
      }
      let cards = Promise.resolve({
        forEach(callback) {
          callback({ ref: { update } })
          callback({ ref: { update } })
          callback({ ref: { update } })
        }
      })
      let cardUpdate1 = Promise.resolve()
      let cardUpdate2 = Promise.resolve()
      let cardUpdate3 = new Promise(resolve => {
        setTimeout(() => resolve(), 100)
      })
      let tagRemove = Promise.resolve()
      let tags = new Tags({ database })
      get.mockReturnValue(cards)
      update.mockReturnValueOnce(cardUpdate1)
      update.mockReturnValueOnce(cardUpdate2)
      update.mockReturnValueOnce(cardUpdate3)
      update.mockReturnValueOnce(tagRemove)
      tags.remove("Name", () => {
        expect(update.mock.calls.length).toEqual(4)
        expect(update.mock.calls[0][0]).toEqual({ "Tags": FieldValue.arrayRemove("Name") })
        expect(update.mock.calls[1][0]).toEqual({ "Tags": FieldValue.arrayRemove("Name") })
        expect(update.mock.calls[2][0]).toEqual({ "Tags": FieldValue.arrayRemove("Name") })
        expect(update.mock.calls[3][0]).toEqual({ "Tags.Name": FieldValue.delete() })
        resolve()
      }, () => {
        reject("Failure is not expected in this scenario")
      })
    })
  })

  it("properly handles a select error during tag removal", () => {
    return new Promise((resolve, reject) => {
      let get = jest.fn()
      let database = {
        collection() {
          return {
            where() {
              return {
                get: get
              }
            }
          }
        }
      }
      let tags = new Tags({ database })
      let cards = Promise.reject("error")
      get.mockReturnValue(cards)
      tags.remove("Name", () => {
        reject("Failure is expected in this scenario")
      }, () => {
        resolve()
      })
    })
  })

  it("properly handles an update error during tag removal", () => {
    return new Promise((resolve, reject) => {
      let update = jest.fn()
      let get = jest.fn()
      let database = {
        collection() {
          return {
            where() {
              return {
                get: get
              }
            }
          }
        },
        update: update
      }
      let cards = Promise.resolve({
        forEach(callback) {
          callback({ ref: { update } })
        }
      })
      let cardUpdate = Promise.reject("error")
      let tags = new Tags({ database })
      get.mockReturnValue(cards)
      update.mockReturnValueOnce(cardUpdate)
      tags.remove("Name", () => {
        reject("Failure is expected in this scenario")
      }, () => {
        resolve()
      })
    })
  })

  it("properly handles a delete error during tag removal", () => {
    return new Promise((resolve, reject) => {
      let mock = jest.fn()
      let database = {
        collection() {
          return {
            where() {
              return {
                get: mock
              }
            }
          }
        },
        update: mock
      }
      let tags = new Tags({ database })
      mock.mockResolvedValueOnce({
        forEach(callback) {
          callback({ ref: { update: mock } })
        }
      })
      mock.mockResolvedValueOnce()
      mock.mockRejectedValueOnce()
      tags.remove("Name", () => {
        reject("Failure is expected in this scenario")
      }, (error, params) => {
        expect(mock.mock.calls.length).toEqual(3)
        expect(mock.mock.calls[1][0]).toEqual({ "Tags": FieldValue.arrayRemove("Name") })
        expect(mock.mock.calls[2][0]).toEqual({ "Tags.Name": FieldValue.delete() })
        resolve()
      })
    })
  })

})
