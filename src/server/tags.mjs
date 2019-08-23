import { FieldValue } from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
    this.ws = options.ws
    this.account = options.account
  }

  check(tag, success, failure) {
    tag = tag.trim()
    if (tag.match(/^[A-Za-z0-9 ]+$/)) {
      success(tag)
    }
    else {
      failure("The tag contains characters which are not allowed")
    }
  }

  create(tag, parent, success, failure) {
    this.check(tag, (trimmed) => {
      this.db.update({ ["Tags." + trimmed]: { "Parent": parent, "Count": 0 } }).then(() => {
        success()
      }).catch(error => {
        console.error("Failed to create the tag: ", error)
        failure("Failed to create the tag")
      })
    }, failure)
  }

  activate(tag, success, failure) {
    this.db.update({ ["Tags." + tag + ".Inactive"]: FieldValue.delete() }).then(() => {
      success()
    }).catch(error => {
      console.error("Failed to activate the tag ", tag, ": ", error)
      failure("Failed to activate the tag")
    })
  }

  deactivate(tag, success, failure) {
    this.db.update({ ["Tags." + tag + ".Inactive"]: true }).then(() => {
      success()
    }).catch(error => {
      console.error("Failed to deactivate the tag ", tag, ": ", error)
      failure("Failed to deactivate the tag")
    })
  }

  remove(tag, success, failure) {
    this.db.collection("Cards").where("Tags", "array-contains", tag).get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Tags": FieldValue.arrayRemove(tag) }))
      })
      return Promise.all(promises).then(() => {
        return this.db.update({ ["Tags." + tag]: FieldValue.delete() }).then(() => {
          success()
        })
      })
    }).catch(error => {
      console.error("Failed to remove the tag: ", error)
      callback("Error", "Failed to remove the tag")
    })
  }

  renameTag(from, to, callback) {
    to = to.trim()
    if (!this.check(to, callback)) {
      return
    }
    this.db.get().then(doc => {
      let tags = doc.data()["Tags"]
      if (to in tags) {
        this.ws.send(JSON.stringify({ "Message": "Error", "Text": "Tag '" + to + "' already exists" }))
        return
      }
      this.db.collection("Cards").where("Tags", "array-contains", from).get().then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.update({ "Tags": FieldValue.arrayRemove(from) }).then(() => {
            doc.ref.update({ "Tags": FieldValue.arrayUnion(to) })
          })
        })
        let data = tags[from]
        data["Count"] = snapshot.size
        let update = {
          ["Tags." + from]: FieldValue.delete(),
          ["Tags." + to]: data
        }
        for (let tag in tags) {
          if (tags[tag]["Parent"] == from) {
            update["Tags." + tag + ".Parent"] = to
          }
        }
        this.db.update(update).then(() => { this.account.getUserData(this.ws, this.db) })
      })
    }).catch(error => {
        console.error("Error getting cards: ", error)
    })
  }

  disableCards(tag, callback) {
    this.db.collection("Cards").where("Tags", "array-contains", tag).get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Disabled": true }))
      })
      promises.push(this.db.update({ ["Tags." + tag + ".Count"]: snapshot.size }))
      return Promise.all(promises)
    }).then(() => {
      callback("Success", "Disabled all cards")
    }).catch(error => {
      callback("Error", "Failed to disable cards")
      console.error("Failed to disable cards: ", error)
    })
  }

  enableCards(tag, callback) {
    this.db.collection("Cards").where("Tags", "array-contains", tag).where("Disabled", "==", true).get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Disabled": FieldValue.delete() }))
      })
      return Promise.all(promises)
    }).then(() => {
      callback("Success", "Enabled all cards")
    }).catch(error => {
      callback("Error", "Failed to enable cards")
      console.error("Failed to enable cards: ", error)
    })
  }

}
