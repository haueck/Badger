/*global process exports*/
const firestore = require("@google-cloud/firestore")
const db = new firestore({ projectId: process.env.GCP_PROJECT })

exports.enableCards = async (req, res) => {
  try {
    let now = new Date()
    let users = await db.collection("Users").get()
    for (let user of users.docs) {
      console.log("Processing user ", user.id)
      let collection = db.collection("Users").doc(user.id).collection("Cards")
      let cards = await collection.where("AvailableFrom", "<", now).get()
      for (let card of cards.docs) {
        console.log("Updating card ", card.id)
        let queue = (card.data()["Successes"] + 1) * 100 + Math.floor(100 * Math.random())
        await collection.doc(card.id).update({
          "Queue": queue,
          "AvailableFrom": firestore.FieldValue.delete()
        })
      }
    }
    res.send("OK")
  } catch(error) {
    console.error(new Error("Failed to enable cards: ", error))
    res.status(500).send("FAIL")
  }
}
