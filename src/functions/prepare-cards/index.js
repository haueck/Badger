/*global process exports*/
const firestore = require("@google-cloud/firestore")
const db = new firestore({ projectId: process.env.GCP_PROJECT })

exports.prepareCards = (req, res) => {
  let now = new Date()
  console.log("Starting function at: ", now)
  db.collection("Users").get().then((users) => {
    users.forEach(user => {
      console.log("Processing user: ", user.id)
      let collection = db.collection("Users").doc(user.id).collection("Cards")
      collection.where("AvailableFrom", "<", now).get().then((cards) => {
        if (cards.empty) {
          console.log("Found no cards")
        }
        cards.forEach(card => {
          let queue = (card.data()["Hits"] + 1) * 100 + Math.floor(100 * Math.random())
          collection.doc(card.id).update({
            "Queue": queue,
            "AvailableFrom": firestore.FieldValue.delete()
          })
          console.log("Updated card: ", card.id)
        })
      }).catch(function(error) {
        console.error("Error getting documents: ", error);
      })
    })
  })
  .catch(function(error) {
    console.error("Error getting documents: ", error);
  })
  res.send("")
}
