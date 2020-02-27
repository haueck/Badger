import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
    this.search = options.search
  }

  get(id, success, failure) {
    this.db.collection("Cards").doc(id).get().then(doc => {
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
    delete card["SearchPhrases"]
    tomorrow.setDate(today.getDate() + 1)
    card["Date"] = today
    card["Hits"] = 0
    card["Revision"] = ""
    card["Successes"] = 0
    card["AvailableFrom"] = tomorrow
    this.db.collection("Cards").add(card).then(doc => {
      card["CardId"] = doc.id
      return this.tags([], card["Tags"])
    }).then(() => {
      return new Promise((resolve, reject) => {
        this.search.index(card["CardId"], card["Tags"], text, resolve, reject)
      })
    }).then(() => {
      return this.db.update({
        LastCard: card["Type"],
        LastTags: card["Tags"]
      })
    }).then(() => {
      success("The card was successfully created")
    }).catch(error => {
      failure("Failed to create the card", { error })
    })
  }

  update(id, card, success, failure) {
    this.get(id, (_, old) => {
      let text = card["SearchPhrases"]
      delete card["SearchPhrases"]
      card["ScheduledFor"] = card["ScheduledFor"] || Firestore.FieldValue.delete()
      this.db.collection("Cards").doc(id).set(card, { merge: true }).then(() => {
        return this.tags(old["Tags"], card["Tags"])
      }).then(() => {
        return new Promise((resolve, reject) => {
          this.search.index(id, card["Tags"], text, resolve, reject)
        })
      }).then(() => {
        success("The card was successfully updated")
      }).catch(error => {
        failure("Failed to updated the card", { id, error })
      })
    }, failure)
  }

  remove(id, success, failure) {
    this.get(id, (_, card) => {
      this.db.collection("Cards").doc(id).delete().then(() => {
        return this.tags(card["Tags"], [])
      }).then(() => {
        success("The card was successfully deleted")
      }).catch(error => {
        failure("Failed to delete the card", { id, error })
      })
    }, failure)
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
    if (Object.keys(tags).length > 0) {
      return this.db.update(tags)
    }
  }
}
