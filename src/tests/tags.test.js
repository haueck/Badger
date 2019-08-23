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
      let promise = Promise.reject("Error")
      let tags = new Tags({ database: { update } })
      update.mockReturnValue(promise)
      tags.create("Name", "Parent", () => {
        reject("In this scenario failure is expected")
      }, () => {
        resolve()
      })
    })
  })

  it("properly handles an invalid tag", () => {
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
      let promise = Promise.reject("Error")
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
      let promise = Promise.reject("Error")
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
      let database = {
        collection() {
          return {
            where() {
              return {
                get() {
                  return get
                }
              }
            }
          }
        }
      }
      let promise = Promise.resolve({
        forEach(callback) {
          callback()
        }
      })
      let tags = new Tags({ database: { update } })
      update.mockReturnValue(promise)
      tags.deactivate("Name", () => {
        reject("Failure is expected in this scenario")
      }, () => {
        resolve()
      })
    })
  })

})
