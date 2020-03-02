import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.db
    this.user = options.user
  }

  create(tag, parent, success, failure) {
    tag = tag.trim()
    this.db.runTransaction(transaction => {
      return transaction.get(this.user).then(doc => {
        let tags = doc.data()["Tags"]
        if (tag in tags) {
          throw new Error("The tag already exists")
        }
        if (!(parent in tags)) {
          throw new Error("The parent does not exist")
        }
        transaction.update(this.user, { ["Tags." + tag]: { "Parent": parent, "Count": 0 } })
      })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to create the tag", { tag, parent, error })
    })
  }

  activate(tag, success, failure) {
    this.user.update({ ["Tags." + tag + ".Inactive"]: Firestore.FieldValue.delete() }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to activate the tag", { tag, error })
    })
  }

  deactivate(tag, success, failure) {
    this.user.update({ ["Tags." + tag + ".Inactive"]: true }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to deactivate the tag", { tag, error })
    })
  }

  remove(tag, success, failure) {
    this.db.runTransaction(transaction => {
      return transaction.get(this.user).then(doc => {
        let tags = doc.data()["Tags"]
        for (let name in tags) {
          if (tags[name]["Parent"] == tag) {
            throw new Error("The tag is not a leaf")
          }
        }
        return transaction.get(this.user.collection("Cards").where("Tags", "array-contains", tag))
      }).then(snapshot => {
        snapshot.forEach(doc => {
          transaction.update(doc.ref, { "Tags": Firestore.FieldValue.arrayRemove(tag) })
        })
        transaction.update(this.user, { ["Tags." + tag]: Firestore.FieldValue.delete() })
      })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to remove the tag", { tag, error })
    })
  }

  rename(from, to, parent, success, failure) {
    to = to.trim()
    this.db.runTransaction(transaction => {
      return transaction.get(this.user).then(doc => {
        let tags = doc.data()["Tags"]
        if (to in tags) {
          throw new Error("The tag already exists")
        }
        if (!(from in tags)) {
          throw new Error("The tag does not exist")
        }
        return transaction.get(this.user.collection("Cards").where("Tags", "array-contains", from))
      }).then(snapshot => {
        snapshot.forEach(doc => {
          transaction.update(doc.ref, { "Tags": Firestore.FieldValue.arrayUnion(to) })
          transaction.update(doc.ref, { "Tags": Firestore.FieldValue.arrayRemove(from) })
        })
        transaction.update(this.user, {
          ["Tags." + to]: { "Parent": parent, "Count": snapshot.size },
          ["Tags." + from]: Firestore.FieldValue.delete()
        })
      })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to rename the tag", { from, to, parent, error })
    })
  }

  disableCards(tag, success, failure) {
    this.user.collection("Cards").where("Tags", "array-contains", tag).where("Disabled", "==", false).get().then(snapshot => {
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
    this.user.collection("Cards").where("Tags", "array-contains", tag).where("Disabled", "==", true).get().then(snapshot => {
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
