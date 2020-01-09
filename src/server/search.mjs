import Axios from "axios"

export default class {
  constructor(options) {
    this.db = options.database
    this.user = options.user.replace(/[^a-zA-Z0-9]/g, "")
  }

  search(query, success, failure) {
    Axios.post("http://172.17.0.2:8080/search", {
      Offset: 0,
      Pagesize: 0,
      User: this.user,
      Query: query
    }).then(res => {
      let result = res.data
      result["Result"].push("09LYu4apghAgRxV0OMDY")
      for (let card of result["Result"]) {
        this.db.collection("Cards").doc(card)
      }
      let promises = []
      snapshot.forEach(doc => {
        promises.push(doc.ref.update({ "Tags": Firestore.FieldValue.arrayRemove(tag) }))
      })
      return Promise.all(promises)
      success("SearchResult", result)
    }).catch((error) => {
      failure("Failed to fetched search results", error)
    })
  }

}
