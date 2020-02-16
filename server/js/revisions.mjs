import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
  }

  create(name, success, failure) {
    name = name.trim()
    this.db.get().then(doc => {
      let revisions = doc.data()["Revisions"]
      if (name in revisions) {
        throw new Error("The revision already exists")
      }
      return this.db.update({ ["Revisions." + name]: 0 })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to create the revision", { name, error })
    })
  }

  rename(from, to, success, failure) {
    to = to.trim()
    this.db.get().then(doc => {
      let revisions = doc.data()["Revisions"]
      if (!(from in revisions)) {
        throw new Error("The revision does not exist")
      }
      if (to in revisions) {
        throw new Error("The revision already exists")
      }
      return this.db.collection("Cards").where("Revision", "==", from).get()
    }).then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Revision": to }))
      })
      promises.push(this.db.update({
        [ "Revisions." + to ]: snapshot.size,
        [ "Revisions." + from ]: Firestore.FieldValue.delete()
      }))
      return Promise.all(promises)
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to create the revision", { from, to, error })
    })
  }

  remove(name, success, failure) {
    this.db.get().then(doc => {
      let revisions = doc.data()["Revisions"]
      if (!(name in revisions)) {
        throw new Error("The revision does not exist")
      }
      return this.db.collection("Cards").where("Revision", "==", name).get()
    }).then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Revision": "" }))
      })
      return Promise.all(promises)
    }).then(() => {
      return this.db.update({ [ "Revisions." + name ]: Firestore.FieldValue.delete() })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to remove the revision", { name, error })
    })
  }

  addTag(tag, revision, success, failure) {
    this.db.collection("Cards").where("Tags", "array-contains", tag).where("Revision", "==", "").get().then(snapshot => {
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Revision": revision }))
      })
      promises.push(this.db.update({
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
    this.db.collection("Cards").doc(card).update({ Revision: revision }).then(() => {
      success("Revision has been changed")
    }).catch(error => {
      failure("Failed to add the card to the revision", { card, revision })
    })
  }
}
