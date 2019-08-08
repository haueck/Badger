import firestore from "@google-cloud/firestore"
import express from "express"
import parser from "body-parser"
import http from "http"
import ws from "ws"
import Session from "./session.mjs"
import Account from "./account.mjs"
import secrets from "./secrets.mjs"

const app = express()
const server = http.createServer(null, app)
const wss = new ws.Server({ server })
const db = new firestore({ projectId: secrets["ProjectId"]})
let session = new Session({ database: db })
let account = new Account({ database: db })

app.use(express.static("public"))
app.use(parser.urlencoded({ extended: true }))
app.use(session.middleware)
app.post("/signin", account.signIn.bind(account))
app.post("/signup", account.signUp.bind(account))
app.get("/signout", account.signOut.bind(account))
app.get("/", (req, res) => {
  if (req.session.user) {
    res.sendFile("/badger/public/html/home.html")
  }
  else {
    res.sendFile("/badger/public/html/welcome.html")
  }
})

wss.on("connection", ws => {
  let user = db.collection("Users").doc("mhfzCGbFpYkjkpNgiQ14")
  ws.on("message", message => {
    let msg = JSON.parse(message)
    if (msg["Message"] === "AddCard") {
      user.collection("Cards").add(msg["Card"]).then(reference => { console.log(reference.id) })
    }
    else if (msg["Message"] === "GetNextCard") {
      const query = user.collection("Cards").where("Queue", ">", 0).orderBy("Queue").limit(1)
      query.get().then(snapshot => {
        if (snapshot.empty) {
          ws.send(JSON.stringify({ "Message": "Error" }))
        } else {
          let doc = snapshot.docs[0]
          ws.send(JSON.stringify({
            "Message": "NextCard",
            "Card": doc.data(),
            "CardId": doc.id
          }))
          let tomorrow  = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          doc.ref.update({
            "Queue": firestore.FieldValue.delete(),
            "AvailableFrom": tomorrow
          })
        }
      }).catch(error => {
          console.error("Error getting documents: ", error)
      })
    }
    else if (msg["Message"] === "GetCard") {
      const document = user.collection("Cards").doc(msg["CardId"])
      document.get().then(doc => {
      if (!doc.exists) {
          ws.send(JSON.stringify({ "Message": "Error" }))
        } else {
          ws.send(JSON.stringify(doc.data()))
        }
      })
    }
    else if (msg["Message"] === "Result") {
      let card = user.collection("Cards").doc(msg["CardId"])
      card.get().then(doc => {
        if (doc.exists) {
          let successes = doc.data()["Successes"]
          if (msg["Pass"]) {
            successes = Math.min(successes + 1, 7)
          }
          let hiatus = {
            0: 1,
            1: 2,
            2: 3,
            3: 5,
            4: 9,
            5: 21,
            6: 21,
            7: 21
          }
          let available  = new Date()
          available.setDate(available.getDate() + hiatus[successes])
          card.update({
            "Hits": firestore.FieldValue.increment(1),
            "Successes": successes,
            "AvailableFrom": available
          })
        }
        else {
          ws.send(JSON.stringify({ "Message": "Error" }))
        }
      })
    }
    else {
      ws.send(JSON.stringify({ "Message": "Error" }))
    }
  })
})

console.log("Starting...")
server.listen(80)
