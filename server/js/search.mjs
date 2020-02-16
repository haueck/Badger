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

  search(query, page, success, failure) {
    let offset = 0
    let pagesize = 25
    let results = {}
    if (String(page).match(/^\d+$/) && page > 0) {
      offset = pagesize * (page - 1)
    }
    Axios.post("http://badger_search:8080/search", {
      User: this.user,
      Query: query,
      Offset: offset,
      Pagesize: pagesize
    }).then(response => {
      let promises = []
      results["Pages"] = Math.ceil(response.data["Matches"] / pagesize)
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
      results["Results"] = docs
      success("SearchResults", results)
    }).catch((error) => {
      failure("Failed to fetch the search results", error)
    })
  }
}
