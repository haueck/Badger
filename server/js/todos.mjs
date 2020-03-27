import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.db
    this.user = options.user
  }

  get(success, failure) {
    return this.user.collection("Todos").get().then(todos => {
      let list = []
      todos.forEach(doc => {
        let todo = doc.data()
        todo["TodoId"] = doc.id
        list.push(todo)
      })
      return list
    }).then(todos => {
      success("Todos", { "Todos": todos })
    }).catch(error => {
      failure("Failed to get a to-do list", { error })
    })
  }

  cache(success, failure) {
    return this.user.collection("Todos").where("Status", "==", "Started").orderBy("Date").get().then(todos => {
      let list = []
      todos.forEach(todo => {
        list.push({
          "Text": todo.data()["Text"],
          "TodoId": todo.id
        })
      })
      return this.user.update({ "Todos": list })
    }).then(() => {
      return success()
    }).catch(error => {
      failure("Failed to cache to-do list items", { error })
    })
  }

  create(todo, success, failure) {
    this.user.collection("Todos").add({
      "Text": todo,
      "Status": "Started",
      "Date": new Date()
    }).then(() => {
      return this.cache(success, failure)
    }).catch(error => {
      failure("Failed to create a to-do list item", { error })
    })
  }

  schedule(todo, date, success, failure) {
    this.user.collection("Todos").add({
      "Text": todo,
      "Status": "Scheduled",
      "Date": date
    }).then(() => {
      success("The to-do was successfully created")
    }).catch(error => {
      failure("Failed to schedule a to-do list item", { error })
    })
  }

  finished(tid, success, failure) {
    this.user.collection("Todos").doc(tid).update({
      "Status": "Finished",
      "Date": new Date()
    }).then(() => {
      return this.cache(success, failure)
    }).catch(error => {
      failure("Failed to finish a to-do list item", { tid, error })
    })
  }

  update(tid, todo, success, failure) {
    this.user.collection("Todos").doc(tid).update({ "Text": todo }).then(() => {
      return this.cache(() => this.get(success, failure), failure)
    }).catch(error => {
      failure("Failed to update a to-do list item", { tid, error })
    })
  }

  remove(tid, success, failure) {
    this.user.collection("Todos").doc(tid).delete().then(() => {
      return this.cache(() => this.get(success, failure), failure)
    }).catch(error => {
      failure("Failed to remove a to-do list item", { tid, error })
    })
  }

  reschedule(tid, date, success, failure) {
    this.user.collection("Todos").doc(tid).update({ "Date": date }).then(() => {
      return this.get(success, failure)
    }).catch(error => {
      failure("Failed to reschedule a to-do list item", { tid, error })
    })
  }
}
