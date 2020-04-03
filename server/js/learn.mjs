import Firestore from "@google-cloud/firestore"
import moment from "moment-timezone"

export default class {
  constructor(options) {
    this.user = options.user
  }

  next(success, failure) {
    this.scheduled().then(card => {
      if (card) {
        success("NextCard", card)
      }
      else {
        this.queue().then(card => {
          if (card) {
            success("NextCard", card)
          }
          else {
            failure("Failed to get a next card")
          }
        })
      }
    })
  }

  scheduled() {
    return this.user.get().then(doc => {
      if (doc.exists) {
        let timezone = doc.data()["Timezone"]
        let date = moment.tz(timezone).format("YYYY-MM-DD")
        return this.user.collection("Cards").where("ScheduledFor", "<=", date).orderBy("ScheduledFor").limit(1).get().then(snapshot => {
          if (!snapshot.empty) {
            let doc = snapshot.docs[0]
            let card = {
              "Card": doc.data(),
              "CardId": doc.id
            }
            let today = new Date()
            let tomorrow  = new Date()
            tomorrow.setDate(today.getDate() + 1)
            return doc.ref.update({
              "ScheduledFor": Firestore.FieldValue.delete(),
              "Queue": Firestore.FieldValue.delete(),
              "AvailableFrom": tomorrow,
              "LastHit": today
            }).then(() => {
              return card
            })
          }
        })
      }
      else {
        console.warn("Failed to get user data")
      }
    }).catch(error => {
      console.warn("Failed to get a scheduled card", error)
    })
  }

  queue() {
    return this.user.collection("Cards").where("Queue", ">", 0).where("Disabled", "==", false).orderBy("Queue").limit(1).get().then(snapshot => {
      if (snapshot.empty) {
        return {}
      }
      else {
        let doc = snapshot.docs[0]
        let card = {
          "Card": doc.data(),
          "CardId": doc.id
        }
        let today = new Date()
        let tomorrow  = new Date()
        tomorrow.setDate(today.getDate() + 1)
        return doc.ref.update({
          "Queue": Firestore.FieldValue.delete(),
          "AvailableFrom": tomorrow,
          "LastHit": today
        }).then(() => {
          return card
        })
      }
    }).catch(error => {
      console.warn("Failed to get a next card", error)
    })
  }

  revise(revision, success, failure) {
    let card = {}
    this.user.collection("Cards").where("Revision", "==", revision).limit(1).get().then(snapshot => {
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
        return this.user.update({ [ "Revisions." + revision ]: Firestore.FieldValue.increment(-1) })
      }
    }).then(() => {
      success("NextCard", card)
    }).catch(error => {
      failure("Failed to get the next card", { error })
    })
  }

  result(card, pass, success, failure) {
    this.user.collection("Cards").doc(card).get().then(doc => {
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
        "Hits": Firestore.FieldValue.increment(1),
        "Successes": successes,
        "AvailableFrom": available
      })
    }).then(() => {
      return this.user.update({ "Hits": Firestore.FieldValue.increment(1) })
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to save results", { error })
    })
  }
}
