/*global process exports*/
const firestore = require("@google-cloud/firestore")
const db = new firestore({ projectId: process.env.GCP_PROJECT })

exports.enableCards = (req, res) => {
  let now = new Date()
  return db.collection("Users").get().then(users => {
    let promises1 = []
    users.forEach(user => {
      console.log("Processing user ", user.id)
      promises1.push(user.ref.collection("Cards").where("AvailableFrom", "<", now).get().then(cards => {
        let promises2 = []
        cards.forEach(card => {
          console.log("Updating card ", card.id)
          let queue = (card.data()["Successes"] + 1) * 100 + Math.floor(100 * Math.random())
          promises2.push(card.ref.update({
            "Queue": queue,
            "AvailableFrom": firestore.FieldValue.delete()
          }))
        })
        return Promise.all(promises2)
      }))
    })
    return Promise.all(promises1)
  }).then(() => {
    res.send("OK")
  }).catch(error => {
    console.error(error)
    res.status(500).send("FAIL")
  })
}
