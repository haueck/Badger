import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
  }

  check(tag, success, failure) {
    tag = tag.trim()
    if (tag.match(/^[A-Za-z0-9 ]+$/)) {
      success(tag)
    }
    else {
      failure("The tag contains characters which are not allowed", { tag })
    }
  }

  create(tag, parent, success, failure) {
    this.check(tag, (trimmed) => {
      this.db.get().then(doc => {
        let tags = doc.data()["Tags"]
        if (trimmed in tags) {
          throw new Error("The tag already exists")
        }
        if (!(parent in tags)) {
          throw new Error("The parent does not exist")
        }
      }).then(() => {
        return this.db.update({ ["Tags." + trimmed]: { "Parent": parent, "Count": 0 } })
      }).then(() => {
        success()
      }).catch(error => {
        failure("Failed to create the tag", { tag, parent, error })
      })
    }, failure)
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
    this.db.collection("Cards").where("Tags", "array-contains", tag).get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Disabled": true }))
      })
      promises.push(this.db.update({ ["Tags." + tag + ".Count"]: snapshot.size }))
      return Promise.all(promises)
    }).then(() => {
      success("Disabled all cards")
    }).catch(error => {
      failure("Failed to disable cards")
    })
  }

  enableCards(tag, success, failure) {
    this.db.collection("Cards").where("Tags", "array-contains", tag).where("Disabled", "==", true).get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Disabled": Firestore.FieldValue.delete() }))
      })
      return Promise.all(promises)
    }).then(() => {
      success("Enabled all cards")
    }).catch(error => {
      failure("Failed to enable cards")
    })
  }

}
