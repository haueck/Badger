import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
  }

  validate(data, success, failure) {
    let card = {}
    let fields = [ "Type", "Tags", "Disabled" ]
    if (data["Type"] == "English") {
      fields.push("Word")
      fields.push("Definition")
      fields.push("PartOfSpeech")
      fields.push("Pronunciation")
      fields.push("UseOfPrepositions")
      fields.push("Examples")
      fields.push("Related")
      fields.push("PhrasalVerb")
      fields.push("Idiom")
      fields.push("Formal")
      fields.push("Informal")
      fields.push("Approval")
      fields.push("Derogatory")
    }
    else if (data["Type"] == "Question") {
      fields.push("Explanation")
      fields.push("Unordered")
      fields.push("Question")
      fields.push("Answers")
      fields.push("Raw")
    }
    else {
      failure("Unknown card type", { data })
      return
    }
    for (let field of fields) {
      if (!(field in data)) {
        failure("Missing field: " + field, { data })
        return
      }
      else {
        card[field] = data[field]
      }
    }
    success(card)
  }

  get(id, success, failure) {
    this.db.collection("Cards").doc(id).get().then(doc => {
      if (doc.exists) {
        success("EditCard", doc.data())
      } else {
        failure("The card does not exist", { id })
      }
    }).catch(error => {
      failure("Failed to get a card", { id, error })
    })
  }

  create(data, success, failure) {
    this.validate(data, (card) => {
      let today = new Date()
      let tomorrow  = new Date()
      tomorrow.setDate(today.getDate() + 1)
      card["Date"] = today
      card["Hits"] = 0
      card["Successes"] = 0
      card["AvailableFrom"] = tomorrow
      this.db.collection("Cards").add(card).then(() => {
        return this.tags([], card["Tags"])
      }).then(() => {
        success("The card was successfully created")
      }).catch(error => {
        failure("Failed to create the card", { error })
      })
    }, failure)
  }

  update(id, data, success, failure) {
    this.validate(data, (card) => {
      this.get(id, (_, old) => {
        this.db.collection("Cards").doc(id).update(card).then(() => {
          return this.tags(old["Tags"], card["Tags"])
        }).then(() => {
          success("The card was successfully updated")
        }).catch(error => {
          failure("Failed to updated the card", { id, error })
        })
      }, failure)
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
