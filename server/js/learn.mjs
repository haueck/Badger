import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
  }

  next(success, failure) {
    let card = {}
    this.db.collection("Cards").where("Queue", ">", 0).where("Disabled", "==", false).orderBy("Queue").limit(1).get().then(snapshot => {
      if (!snapshot.empty) {
        let doc = snapshot.docs[0]
        card["Card"] = doc.data()
        card["CardId"] = doc.id
        let today = new Date()
        let tomorrow  = new Date()
        tomorrow.setDate(today.getDate() + 1)
        return doc.ref.update({
          "Queue": Firestore.FieldValue.delete(),
          "AvailableFrom": tomorrow,
          "LastHit": today
        })
      }
    }).then(() => {
      success("NextCard", card)
    }).catch(error => {
      failure("Failed to get the next card", { error })
    })
  }

  revise(revision, success, failure) {
    let card = {}
    this.db.collection("Cards").where("Revision", "==", revision).limit(1).get().then(snapshot => {
      if (!snapshot.empty) {
        let today = new Date()
        let tomorrow  = new Date()
        let doc = snapshot.docs[0]
        tomorrow.setDate(today.getDate() + 1)
        card["Card"] = doc.data()
        card["CardId"] = doc.id
        return doc.ref.update({
          "Queue": Firestore.FieldValue.delete(),
          "AvailableFrom": tomorrow,
          "LastHit": today,
          "Revision": ""
        })
      }
    }).then(() => {
      if ("Card" in card) {
        return this.db.update({ [ "Revisions." + revision ]: Firestore.FieldValue.increment(-1) })
      }
    }).then(() => {
      success("NextCard", card)
    }).catch(error => {
      failure("Failed to get the next card", { error })
    })
  }

  result(card, pass, success, failure) {
    this.db.collection("Cards").doc(card).get().then(doc => {
      if (!doc.exists) {
        throw new Error("The card does not exist")
      }
      let successes = doc.data()["Successes"]
      if (pass) {
        successes = Math.min(successes + 1, 7)
      }
      let hiatus = {
        0: 1,
        1: 2,
        2: 3,
        3: 5,
        4: 9,
        5: 21,
        6: 21,
        7: 21
      }
      let available = new Date()
      available.setDate(available.getDate() + hiatus[successes])
      return doc.ref.update({
        "Successes": successes,
        "AvailableFrom": available
      })
    }).then(() => {
      return this.db.update({ "Hits": Firestore.FieldValue.increment(1) })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to save results", { error })
    })
  }
}
