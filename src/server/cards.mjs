export default class {
  constructor(options) {
    this.db = options.database
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

  create(card, success, failure) {
    this.db.collection("Cards").add(card).then(() => {
      success("The card was successfully created")
    }).catch(error => {
      failure("Failed to create the card", { error })
    })
  }

  update(id, card, success, failure) {
    this.db.collection("Cards").doc(id).set(card).then(() => {
      success("The card was successfully updated")
    }).catch(error => {
      failure("Failed to updated the card", { id, error })
    })
  }

  remove(id, success, failure) {
    this.db.collection("Cards").doc(id).delete().then(() => {
      success("The card was successfully deleted")
    }).catch(error => {
      failure("Failed to delete the card", { id, error })
    })
  }
}
