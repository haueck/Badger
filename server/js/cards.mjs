import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.db
    this.user = options.user
    this.search = options.search
  }

  get(id, success, failure) {
    this.user.collection("Cards").doc(id).get().then(doc => {
      if (doc.exists) {
        let card = doc.data()
        for (let field of [ "Date", "Hits", "Successes", "AvailableFrom", "LastHit", "Queue" ]) {
          delete card[field]
        }
        success("EditCard", card)
      } else {
        failure("The card does not exist", { id })
      }
    }).catch(error => {
      failure("Failed to get a card", { id, error })
    })
  }

  create(card, success, failure) {
    let today = new Date()
    let tomorrow  = new Date()
    let text = card["SearchPhrases"]
    let doc = this.user.collection("Cards").doc()
    delete card["SearchPhrases"]
    tomorrow.setDate(today.getDate() + 1)
    card["Date"] = today
    card["Hits"] = 0
    card["Revision"] = ""
    card["Successes"] = 0
    card["AvailableFrom"] = tomorrow
    this.db.runTransaction(transaction => {
      let update = this.tags([], card["Tags"])
      update["LastCard"] = card["Type"]
      update["LastTags"] = card["Tags"]
      transaction.set(doc, card)
      transaction.update(this.user, update)
      return this.search.index(doc.id, card["Tags"], text)
    }).then(() => {
      success("The card was successfully created")
    }).catch(error => {
      failure("Failed to create the card", { error })
    })
  }

  update(id, card, success, failure) {
    let ref = this.user.collection("Cards").doc(id)
    this.db.runTransaction(transaction => {
      return transaction.get(ref).then(doc => {
        if (!doc.exists) {
          throw new Error("Card " + id + " does not exist")
        }
        let text = card["SearchPhrases"]
        delete card["SearchPhrases"]
        card["ScheduledFor"] = card["ScheduledFor"] || Firestore.FieldValue.delete()
        transaction.set(ref, card, { merge: true })
        let tags = this.tags(doc.data()["Tags"], card["Tags"])
        if (Object.keys(tags).length > 0) {
          transaction.update(this.user, tags)
        }
        return this.search.index(id, card["Tags"], text)
      })
    }).then(() => {
      success("The card was successfully updated")
    }).catch(error => {
      failure("Failed to updated the card", { id, error })
    })
  }

  remove(id, success, failure) {
    let ref = this.user.collection("Cards").doc(id)
    this.db.runTransaction(transaction => {
      return transaction.get(ref).then(doc => {
        if (!doc.exists) {
          throw new Error("Card " + id + " does not exist")
        }
        transaction.delete(ref)
        let tags = this.tags(doc.data()["Tags"], [])
        if (Object.keys(tags).length > 0) {
          transaction.update(this.user, tags)
        }
        return this.search.remove(id)
      })
    }).then(() => {
      success("The card was successfully deleted")
    }).catch(error => {
      failure("Failed to delete the card", { id, error })
    })
  }

  tags(remove, add) {
    let tags = {}
    for (let tag of remove) {
      let key = "Tags." + tag + ".Count"
      tags[key] = Firestore.FieldValue.increment(-1)
    }
    for (let tag of add) {
      let key = "Tags." + tag + ".Count"
      if (key in tags) {
        delete tags[key]
      }
      else {
        tags[key] = Firestore.FieldValue.increment(1)
      }
    }
    return tags
  }
}
