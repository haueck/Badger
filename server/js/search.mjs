import Axios from "axios"

export default class {
  constructor(options) {
    this.user = options.user
    this.id = options.user.id
  }

  index(id, tags, text) {
    let request = {
      CardId: id,
      User: this.id,
      Tags: tags,
      Text: text
    }
    return Axios.post("http://badger_search:8080/index", request)
  }

  remove(id) {
    let request = {
      CardId: id,
      User: this.id
    }
    return Axios.post("http://badger_search:8080/remove", request)
  }

  search(query, page, success, failure) {
    let offset = 0
    let pagesize = 25
    let results = {}
    if (String(page).match(/^\d+$/) && page > 0) {
      offset = pagesize * (page - 1)
    }
    Axios.post("http://badger_search:8080/search", {
      User: this.id,
      Query: query,
      Offset: offset,
      Pagesize: pagesize
    }).then(response => {
      let promises = []
      results["Pages"] = Math.ceil(response.data["Matches"] / pagesize)
      for (let id of response.data["Results"]) {
        let promise = this.user.collection("Cards").doc(id).get().then(doc => {
          if (doc.exists) {
            let card = doc.data()
            card["CardId"] = id
            return card
          }
          else {
            console.error("Failed to find a card with id " + id)
            return { Missing: true }
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
