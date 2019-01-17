const express = require("express")
const http = require("http")
const ws = require("ws")

const app = express()
const server = http.createServer(null, app)
const wss = new ws.Server({ server })
const firestore = require("@google-cloud/firestore")
const db = new firestore({
  projectId: "badger-218310",
  timestampsInSnapshots: true
})

app.use(express.static("public"))

/*app.get([ "/", "/add", "/learn" ], (req, res) => {
    res.sendFile("/badger/public/index.html")
})*/

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    let msg = JSON.parse(message)
    if (msg["Message"] === "AddCard") {
      db.collection("Cards").add(msg["Card"]).then(reference => { console.log(reference.id) })
    }
    else if (msg["Message"] === "GetNextCard") {
      const document = db.collection("Cards").doc("eVdXf8KsPPotfC23JOET")
      document.get().then((doc) => {
        if (!doc.exists) {
          ws.send("{ 'Message': 'Error' }")
        } else {
          let card = doc.data()
          card["Message"] = "NextCard"
          ws.send(JSON.stringify(card))
        }
      })
    }
    else if (msg["Message"] === "GetCard") {
      const document = db.collection("Cards").doc(msg["CardId"])
      document.get().then((doc) => {
      if (!doc.exists) {
          ws.send("{ 'Message': 'Error' }")
        } else {
          ws.send(JSON.stringify(doc.data()))
        }
      })
    } else {
      ws.send("{ 'Message': 'Error' }")
    }
  })
})

console.log("Starting...")
server.listen(80)
