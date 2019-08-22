import firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
    this.ws = options.ws
    this.account = options.account
  }

  check(tag, callback) {
    if (!tag.match(/^[A-Za-z0-9 ]+$/)) {
      callback("Error", "The tag contains characters that are not allowed")
      return false
    }
    return true
  }

  createTag(tag, parent, callback) {
    tag = tag.trim()
    if (!this.check(tag, callback)) {
      return
    }
    this.db.update({ ["Tags." + tag]: { "Parent": parent, "Count": 0 } }).then(doc => {
      callback("Success", "The tag was created")
    }).catch(error => {
      console.error("Failed to create the tag: ", error)
      callback("Error", "Failed to create the tag")
    })
  }

  activateTag(tag, success, failure) {
    return this.db.update({ ["Tags." + tag + ".Inactive"]: firestore.FieldValue.delete() }).then(() => {
      success()
    }).catch(error => {
      console.error("Failed to activate the tag ", tag, ": ", error)
      failure("Error", "Failed to activate the tag")
    })
  }

  deactivateTag(tag, success, failure) {
    this.db.update({ ["Tags." + tag + ".Inactive"]: true }).then(() => {
      success()
    }).catch(error => {
      console.error("Failed to deactivate the tag ", tag, ": ", error)
      failure("Error", "Failed to deactivate the tag")
    })
  }

  removeTag(tag) {
    this.db.collection("Cards").where("Tags", "array-contains", tag).get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.update({ "Tags": firestore.FieldValue.arrayRemove(tag) })
      })
    }).catch(error => {
        console.error("Error getting cards: ", error)
    })
    this.db.update({ ["Tags." + tag]: firestore.FieldValue.delete() }).then(() => {
      this.account.getUserData(this.ws, this.db)
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
          doc.ref.update({ "Tags": firestore.FieldValue.arrayRemove(from) }).then(() => {
            doc.ref.update({ "Tags": firestore.FieldValue.arrayUnion(to) })
          })
        })
        let data = tags[from]
        data["Count"] = snapshot.size
        let update = {
          ["Tags." + from]: firestore.FieldValue.delete(),
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
        promises.push(doc.ref.update({ "Disabled": firestore.FieldValue.delete() }))
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
