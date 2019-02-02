const express = require("express")
const http = require("http")
const ws = require("ws")

const app = express()
const server = http.createServer(null, app)
const wss = new ws.Server({ server })
const firestore = require("@google-cloud/firestore")
const db = new firestore({ projectId: "badger-218310" })

app.use(express.static("public"))

/*app.get([ "/", "/add", "/learn" ], (req, res) => {
    res.sendFile("/badger/public/index.html")
})*/

wss.on("connection", function connection(ws) {
  let user = db.collection("Users").doc("mhfzCGbFpYkjkpNgiQ14")
  ws.on("message", function incoming(message) {
    let msg = JSON.parse(message)
    if (msg["Message"] === "AddCard") {
      user.collection("Cards").add(msg["Card"]).then(reference => { console.log(reference.id) })
    }
    else if (msg["Message"] === "GetNextCard") {
      const query = user.collection("Cards").where("Queue", ">", 0).orderBy("Queue").limit(1)
      query.get().then((snapshot) => {
        if (snapshot.empty) {
          ws.send(JSON.stringify({ "Message": "Error" }))
        } else {
          let card = snapshot.docs[0].data()
          card["Message"] = "NextCard"
          ws.send(JSON.stringify(card))
        }
      }).catch(function(error) {
          console.error("Error getting documents: ", error)
      })
    }
    else if (msg["Message"] === "GetCard") {
      const document = user.collection("Cards").doc(msg["CardId"])
      document.get().then((doc) => {
      if (!doc.exists) {
          ws.send(JSON.stringify({ "Message": "Error" }))
        } else {
          ws.send(JSON.stringify(doc.data()))
        }
      })
    } else {
      ws.send(JSON.stringify({ "Message": "Error" }))
    }
  })
})

console.log("Starting...")
server.listen(80)
