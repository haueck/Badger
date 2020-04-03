import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.db
    this.user = options.user
  }

  create(name, success, failure) {
    name = name.trim()
    this.db.runTransaction(transaction => {
      return transaction.get(this.user).then(doc => {
        let revisions = doc.data()["Revisions"]
        if (name in revisions) {
          throw new Error("The revision already exists")
        }
        transaction.update(this.user, { ["Revisions." + name]: 0 })
      })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to create the revision", { name, error })
    })
  }

  rename(from, to, success, failure) {
    to = to.trim()
    this.db.runTransaction(transaction => {
      return transaction.get(this.user).then(doc => {
        let revisions = doc.data()["Revisions"]
        if (!(from in revisions)) {
          throw new Error("The revision does not exist")
        }
        if (to in revisions) {
          throw new Error("The revision already exists")
        }
        return transaction.get(this.user.collection("Cards").where("Revision", "==", from))
      }).then(snapshot => {
        snapshot.forEach(doc => {
          transaction.update(doc.ref, { "Revision": to })
        })
        transaction.update(this.user, {
          [ "Revisions." + to ]: snapshot.size,
          [ "Revisions." + from ]: Firestore.FieldValue.delete()
        })
      })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to create the revision", { from, to, error })
    })
  }

  remove(name, success, failure) {
    this.db.runTransaction(transaction => {
      return transaction.get(this.user).then(doc => {
        let revisions = doc.data()["Revisions"]
        if (!(name in revisions)) {
          throw new Error("The revision does not exist")
        }
        return transaction.get(this.user.collection("Cards").where("Revision", "==", name))
      }).then(snapshot => {
        snapshot.forEach(doc => {
          transaction.update(doc.ref, { "Revision": "" })
        })
        transaction.update(this.user, { [ "Revisions." + name ]: Firestore.FieldValue.delete() })
      })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to remove the revision", { name, error })
    })
  }

  addTag(tag, revision, success, failure) {
    this.user.collection("Cards").where("Tags", "array-contains", tag).where("Revision", "==", "").get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Revision": revision }))
      })
      promises.push(this.user.update({
        [ "Revisions." + revision ]: Firestore.FieldValue.increment(snapshot.size)
      }))
      return Promise.all(promises)
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to add the tag to the revision", { tag, revision, error })
    })
  }

  addCard(card, revision, success, failure) {
    let current = null
    this.user.collection("Cards").doc(card).get().then(doc => {
      if (doc.exists) {
        current = doc.data()["Revision"]
        return doc.ref.update({ Revision: revision })
      }
      else {
        throw Error("Card does not exist: " + card)
      }
    }).then(() => {
      if (current) {
        return this.user.update({
          [ "Revisions." + current ]: Firestore.FieldValue.increment(-1),
          [ "Revisions." + revision ]: Firestore.FieldValue.increment(1)
        })
      }
      else {
        return this.user.update({
          [ "Revisions." + revision ]: Firestore.FieldValue.increment(1)
        })
      }
    }).then(() => {
      success("Revision has been changed")
    }).catch(error => {
      failure("Failed to add the card to the revision", { card, revision, error })
    })
  }
}
