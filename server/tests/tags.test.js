import { FieldValue } from "@google-cloud/firestore"
import Tags from "tags.mjs"

describe("Tags", () => {

  function make(mock) {
    return new Tags({
      database: {
        collection() {
          return {
            where() {
              return {
                where() {
                  return {
                    get: mock
                  }
                },
                get: mock
              }
            }
          }
        },
        get: mock,
        update: mock
      }
    })
  }

  function snapshot(tags) {
    if (Array.isArray(tags)) {
      let list = {}
      tags.forEach(tag => { list[tag] = true })
      tags = list
    }
    return {
      data() {
        return {
          Tags: tags
        }
      }
    }
  }

  it("properly creates a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([ "Parent" ]))
    mock.mockResolvedValueOnce()
    return new Promise((resolve, reject) => {
      tags.create("Name ", "Parent", resolve, reject)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(2)
      expect(mock.mock.calls[1][0]).toEqual({ "Tags.Name": { "Parent": "Parent", "Count": 0 } })
    })
  })

  it("properly handles duplicates while creating a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([ "Name", "Parent" ]))
    return new Promise((resolve, reject) => {
      tags.create("Name", "Parent", reject, resolve)
    }).catch((error) => {
      throw new Error("Unexpected success " + (error || ""))
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
    })
  })

  it("properly handles missing parrent while creating a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([]))
    return new Promise((resolve, reject) => {
      tags.create("Name", "Parent", reject, resolve)
    }).catch((error) => {
      throw new Error("Unexpected success " + (error || ""))
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
    })
  })

  it("properly handles a db error while creating a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([ "Parent" ]))
    mock.mockRejectedValueOnce()
    return new Promise((resolve, reject) => {
      tags.create("Name", "Parent", reject, resolve)
    }).catch((error) => {
      throw new Error("Unexpected success " + (error || ""))
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(2)
    })
  })

  it("properly handles an invalid tag name while creating a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.create("Name$", "Parent", reject, resolve)
    }).catch((error) => {
      throw new Error("Unexpected success " + (error || ""))
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(0)
    })
  })

  it("properly activates a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce()
    return new Promise((resolve, reject) => {
      tags.activate("Name", resolve, reject)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
      expect(mock.mock.calls[0][0]).toEqual({ "Tags.Name.Inactive": FieldValue.delete() })
    })
  })

  it("properly handles a db error during activation", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockRejectedValueOnce()
    return new Promise((resolve, reject) => {
      tags.activate("Name", reject, resolve)
    }).catch((error) => {
      throw new Error("Unexpected success " + (error || ""))
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
    })
  })

  it("properly deactivates a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce()
    return new Promise((resolve, reject) => {
      tags.deactivate("Name", resolve, reject)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
      expect(mock.mock.calls[0][0]).toEqual({ "Tags.Name.Inactive": true })
    })
  })

  it("properly handles a db error during deactivation", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockRejectedValueOnce()
    return new Promise((resolve, reject) => {
      tags.deactivate("Name", reject, resolve)
    }).catch((error) => {
      throw new Error("Unexpected success " + (error || ""))
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
    })
  })

  it("properly removes a tag", () => {
    let mock = jest.fn()
    mock.mockResolvedValueOnce(snapshot({ "Tag": { "Parent": "Parent" } }))
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
        callback({ ref: { update: mock } })
        callback({ ref: { update: mock } })
      }
    })
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.remove("Name", resolve, reject)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(6)
      expect(mock.mock.calls[2][0]).toEqual({ "Tags": FieldValue.arrayRemove("Name") })
      expect(mock.mock.calls[3][0]).toEqual({ "Tags": FieldValue.arrayRemove("Name") })
      expect(mock.mock.calls[4][0]).toEqual({ "Tags": FieldValue.arrayRemove("Name") })
      expect(mock.mock.calls[5][0]).toEqual({ "Tags.Name": FieldValue.delete() })
    })
  })

  it("properly handles a non-leaf tag during tag removal", () => {
    let mock = jest.fn()
    mock.mockResolvedValueOnce(snapshot({ "Tag": { "Parent": "Name" } }))
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.remove("Name", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
    })
  })

  it("properly handles a select error during tag removal", () => {
    let mock = jest.fn()
    mock.mockResolvedValueOnce(snapshot([]))
    mock.mockRejectedValueOnce()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.remove("Name", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(2)
    })
  })

  it("properly handles an update error during tag removal", () => {
    let mock = jest.fn()
    mock.mockResolvedValueOnce(snapshot([]))
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
      }
    })
    mock.mockRejectedValueOnce()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.remove("Name", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(3)
    })
  })

  it("properly handles a delete error during tag removal", () => {
    let mock = jest.fn()
    mock.mockResolvedValueOnce(snapshot([]))
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
      }
    })
    mock.mockResolvedValueOnce()
    mock.mockRejectedValueOnce()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.remove("Name", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(4)
      expect(mock.mock.calls[2][0]).toEqual({ "Tags": FieldValue.arrayRemove("Name") })
      expect(mock.mock.calls[3][0]).toEqual({ "Tags.Name": FieldValue.delete() })
    })
  })

  it("properly renames a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([ "From", "Parent" ]))
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
        callback({ ref: { update: mock } })
      },
      size: 2
    })
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    return new Promise((resolve, reject) => {
      tags.rename("From", "To", "Parent", resolve, reject)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(9)
      expect(mock.mock.calls[1][0]).toEqual({ "Tags.To": { "Parent": "Parent", "Count": 0 } })
      expect(mock.mock.calls[3][0]).toEqual({ "Tags": FieldValue.arrayUnion("To") })
      expect(mock.mock.calls[4][0]).toEqual({ "Tags": FieldValue.arrayUnion("To") })
      expect(mock.mock.calls[5][0]).toEqual({ "Tags.To.Count": 2 })
      expect(mock.mock.calls[6][0]).toEqual({ "Tags": FieldValue.arrayRemove("From") })
      expect(mock.mock.calls[7][0]).toEqual({ "Tags": FieldValue.arrayRemove("From") })
      expect(mock.mock.calls[8][0]).toEqual({ "Tags.From": FieldValue.delete() })
    })
  })

  it("properly handles a select error while renaming a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([ "From", "Parent" ]))
    mock.mockResolvedValueOnce()
    mock.mockRejectedValueOnce()
    return new Promise((resolve, reject) => {
      tags.rename("From", "To", "Parent", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(3)
      expect(mock.mock.calls[1][0]).toEqual({ "Tags.To": { "Parent": "Parent", "Count": 0 } })
    })
  })

  it("properly handles an array union error while renaming a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([ "From", "Parent" ]))
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
      },
      size: 1
    })
    mock.mockRejectedValueOnce()
    mock.mockResolvedValueOnce()
    return new Promise((resolve, reject) => {
      tags.rename("From", "To", "Parent", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(5)
      expect(mock.mock.calls[1][0]).toEqual({ "Tags.To": { "Parent": "Parent", "Count": 0 } })
      expect(mock.mock.calls[3][0]).toEqual({ "Tags": FieldValue.arrayUnion("To") })
      expect(mock.mock.calls[4][0]).toEqual({ "Tags.To.Count": 1 })
    })
  })

  it("properly handles an array remove error while renaming a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([ "From", "Parent" ]))
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
      },
      size: 1
    })
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockRejectedValueOnce()
    return new Promise((resolve, reject) => {
      tags.rename("From", "To", "Parent", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(6)
      expect(mock.mock.calls[1][0]).toEqual({ "Tags.To": { "Parent": "Parent", "Count": 0 } })
      expect(mock.mock.calls[3][0]).toEqual({ "Tags": FieldValue.arrayUnion("To") })
      expect(mock.mock.calls[4][0]).toEqual({ "Tags.To.Count": 1 })
      expect(mock.mock.calls[5][0]).toEqual({ "Tags": FieldValue.arrayRemove("From") })
    })
  })

  it("properly handles a counter update error while renaming a tag", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce(snapshot([ "From", "Parent" ]))
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce({
      forEach() { },
      size: 0
    })
    mock.mockRejectedValueOnce()
    return new Promise((resolve, reject) => {
      tags.rename("From", "To", "Parent", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(4)
      expect(mock.mock.calls[1][0]).toEqual({ "Tags.To": { "Parent": "Parent", "Count": 0 } })
      expect(mock.mock.calls[3][0]).toEqual({ "Tags.To.Count": 0 })
    })
  })

  it("properly disables cards", () => {
    let mock = jest.fn()
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
        callback({ ref: { update: mock } })
        callback({ ref: { update: mock } })
      },
      size: 3
    })
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.disableCards("Name", resolve, reject)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(4)
      expect(mock.mock.calls[1][0]).toEqual({ "Disabled": true })
      expect(mock.mock.calls[2][0]).toEqual({ "Disabled": true })
      expect(mock.mock.calls[3][0]).toEqual({ "Disabled": true })
    })
  })

  it("properly handles a select error while disabling cards", () => {
    let mock = jest.fn()
    mock.mockRejectedValueOnce()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.disableCards("Name", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
    })
  })

  it("properly handles an update error while disabling cards", () => {
    let mock = jest.fn()
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
      },
      size: 1
    })
    mock.mockRejectedValueOnce()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.disableCards("Name", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(2)
      expect(mock.mock.calls[1][0]).toEqual({ "Disabled": true })
    })
  })

  it("properly enables cards", () => {
    let mock = jest.fn()
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
        callback({ ref: { update: mock } })
        callback({ ref: { update: mock } })
        callback({ ref: { update: mock } })
      },
      size: 4
    })
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    mock.mockResolvedValueOnce()
    let tags = make(mock)
    return new Promise((resolve, reject) => {
      tags.enableCards("Name", resolve, reject)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(5)
      expect(mock.mock.calls[1][0]).toEqual({ "Disabled": false })
      expect(mock.mock.calls[2][0]).toEqual({ "Disabled": false })
      expect(mock.mock.calls[3][0]).toEqual({ "Disabled": false })
      expect(mock.mock.calls[4][0]).toEqual({ "Disabled": false })
    })
  })

  it("properly handles a select error while enabling cards", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockRejectedValueOnce()
    return new Promise((resolve, reject) => {
      tags.enableCards("Name", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(1)
    })
  })

  it("properly handles an update error while enabling cards", () => {
    let mock = jest.fn()
    let tags = make(mock)
    mock.mockResolvedValueOnce({
      forEach(callback) {
        callback({ ref: { update: mock } })
      },
      size: 1
    })
    mock.mockRejectedValueOnce()
    mock.mockResolvedValueOnce()
    return new Promise((resolve, reject) => {
      tags.enableCards("Name", reject, resolve)
    }).catch(error => {
      throw new Error(error)
    }).then(() => {
      expect(mock.mock.calls.length).toEqual(2)
      expect(mock.mock.calls[1][0]).toEqual({ "Disabled": false })
    })
  })
})
