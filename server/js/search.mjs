import Axios from "axios"

export default class {
  constructor(options) {
    this.db = options.database
    this.user = options.user
  }

  index(id, tags, text, success, failure) {
    let request = {
        CardId: id,
        User: this.user,
        Tags: tags,
        Text: text
    }
    Axios.post("http://badger_search:8080/index", request).then(() => {
      success("The card has been successfully indexed")
    }).catch(error => {
      console.error(error)
      failure("Failed to index card " + id)
    })
  }

  search(query, success, failure) {
    Axios.post("http://badger_search:8080/search", {
      Offset: 0,
      Pagesize: 10,
      User: this.user,
      Query: query
    }).then(response => {
      let promises = []
      for (let id of response.data["Results"]) {
        let promise = this.db.collection("Cards").doc(id).get().then(doc => {
          if (doc.exists) {
            let card = doc.data()
            card["CardId"] = id
            return card
          }
          else {
            console.error("Failed to find a card with id " + id)
            return { Type: "Missing" }
          }
        })
        promises.push(promise)
      }
      return Promise.all(promises)
    }).then(docs => {
      success("SearchResults", { Results: docs })
    }).catch((error) => {
      failure("Failed to fetch the search results", error)
    })
  }
}
