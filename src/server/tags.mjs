import { FieldValue } from "@google-cloud/firestore"

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
    // Exists?!?
    //let tags = doc.data()["Tags"]
    //if (to in tags) {
    //  failure("The tag '" + to + "' already exists")
    //  return
    //}
    this.check(tag, (trimmed) => {
      this.db.update({ ["Tags." + trimmed]: { "Parent": parent, "Count": 0 } }).then(() => {
        success()
      }).catch(error => {
        failure("Failed to create the tag", { tag, parent, error })
      })
    }, failure)
  }

  activate(tag, success, failure) {
    this.db.update({ ["Tags." + tag + ".Inactive"]: FieldValue.delete() }).then(() => {
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
    this.db.collection("Cards").where("Tags", "array-contains", tag).get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Tags": FieldValue.arrayRemove(tag) }))
      })
      return Promise.all(promises)
    }).then(() => {
      return this.db.update({ ["Tags." + tag]: FieldValue.delete() })
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
          promises.push(doc.ref.update({ "Tags": FieldValue.arrayRemove(from) }).then(() => {
            doc.ref.update({ "Tags": FieldValue.arrayUnion(to) })
          }))
        })
        promises.push(this.db.update({ ["Tags." + to + ".Count"]: snapshot.size }))
        return Promise.all(promises)
      }).then(() => {
        return this.db.update({ ["Tags." + from]: FieldValue.delete() })
      }).then({
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
        promises.push(doc.ref.update({ "Disabled": FieldValue.delete() }))
      })
      return Promise.all(promises)
    }).then(() => {
      success("Enabled all cards")
    }).catch(error => {
      failure("Failed to enable cards")
    })
  }

}
