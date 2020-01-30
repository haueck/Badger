import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
  }

  create(tag, parent, success, failure) {
    tag = tag.trim()
    this.db.get().then(doc => {
      let tags = doc.data()["Tags"]
      if (tag in tags) {
        throw new Error("The tag already exists")
      }
      if (!(parent in tags)) {
        throw new Error("The parent does not exist")
      }
    }).then(() => {
      return this.db.update({ ["Tags." + tag]: { "Parent": parent, "Count": 0 } })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to create the tag", { tag, parent, error })
    })
  }

  activate(tag, success, failure) {
    this.db.update({ ["Tags." + tag + ".Inactive"]: Firestore.FieldValue.delete() }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to activate the tag", { tag, error })
    })
  }

  deactivate(tag, success, failure) {
    this.db.update({ ["Tags." + tag + ".Inactive"]: true }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to deactivate the tag", { tag, error })
    })
  }

  remove(tag, success, failure) {
    this.db.get().then(doc => {
      let tags = doc.data()["Tags"]
      for (let name in tags) {
        if (tags[name]["Parent"] == tag) {
          throw new Error("The tag is not a leaf")
        }
      }
      return this.db.collection("Cards").where("Tags", "array-contains", tag).get()
    }).then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Tags": Firestore.FieldValue.arrayRemove(tag) }))
      })
      return Promise.all(promises)
    }).then(() => {
      return this.db.update({ ["Tags." + tag]: Firestore.FieldValue.delete() })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to remove the tag", { tag, error })
    })
  }

  rename(from, to, parent, success, failure) {
    to = to.trim()
    this.create(to, parent, () => {
      this.db.collection("Cards").where("Tags", "array-contains", from).get().then(snapshot => {
        let promises = []
        snapshot.forEach(doc => {
          let promise = doc.ref.update({ "Tags": Firestore.FieldValue.arrayUnion(to) }).then(() => {
            return doc.ref.update({ "Tags": Firestore.FieldValue.arrayRemove(from) })
          })
          promises.push(promise)
        })
        promises.push(this.db.update({ ["Tags." + to + ".Count"]: snapshot.size }))
        return Promise.all(promises)
      }).then(() => {
        return this.db.update({ ["Tags." + from]: Firestore.FieldValue.delete() })
      }).then(() => {
        success()
      }).catch(error => {
        failure("Failed to rename the tag", { from, to, parent, error })
      })
    }, failure)
  }

  disableCards(tag, success, failure) {
    this.db.collection("Cards").where("Tags", "array-contains", tag).where("Disabled", "==", false).get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Disabled": true }))
      })
      return Promise.all(promises)
    }).then(() => {
      success("Disabled all cards")
    }).catch(error => {
      failure("Failed to disable cards", { tag, error })
    })
  }

  enableCards(tag, success, failure) {
    this.db.collection("Cards").where("Tags", "array-contains", tag).where("Disabled", "==", true).get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Disabled": false }))
      })
      return Promise.all(promises)
    }).then(() => {
      success("Enabled all cards")
    }).catch(error => {
      failure("Failed to enable cards", { tag, error })
    })
  }

}
