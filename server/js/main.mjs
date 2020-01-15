import express from "express"
import parser from "body-parser"
import https from "https"
import http from "http"
import fs from "fs"
import ws from "ws"
import Firestore from "@google-cloud/firestore"
import Session from "./session.mjs"
import Account from "./account.mjs"
import secrets from "./secrets.mjs"
import Tags from "./tags.mjs"
import Cards from "./cards.mjs"
import Search from "./search.mjs"

let certificates = {
  key: fs.readFileSync("/badger/certificates/privkey.pem"),
  cert: fs.readFileSync("/badger/certificates/fullchain.pem"),
}
const app = express()
const server = https.createServer(certificates, app)
const wss = new ws.Server({ noServer: true })
const db = new Firestore({ projectId: secrets["ProjectId"]})
let session = new Session({ database: db })
let account = new Account({ database: db })

app.use(express.static("/badger/dist"))
app.use(parser.urlencoded({ extended: true }))
app.use(session.parser)
app.post("/signin", account.signIn.bind(account))
app.post("/signup", account.signUp.bind(account))
app.get("/signout", account.signOut.bind(account))
app.get("/", (req, res) => {
  if (req.session.user) {
    res.sendFile("/badger/dist/html/home.html")
  }
  else {
    res.sendFile("/badger/dist/html/welcome.html")
  }
})

server.on("upgrade", function(request, socket, head) {
  session.parser(request, {}, () => {
    if (!request.session.user) {
      console.error("Not logged!")
      socket.destroy()
      return
    }
    else {
      wss.handleUpgrade(request, socket, head, ws => {
        wss.emit("connection", ws, request)
      })
    }
  })
})

wss.on("connection", (ws, request) => {
  let user = db.collection("Users").doc(request.session.user)
  let tags = new Tags({ database: user })
  let cards = new Cards({ database: user })
  let search = new Search({
    database: user,
    user: request.session.user
  })
  ws.on("message", message => {
    let msg = JSON.parse(message)
    let status = (level, text) => {
      ws.send(JSON.stringify({
        "JobId": msg["JobId"],
        "Message": "Status",
        "Level": level,
        "Text": text
      }))
    }
    let success = (text) => { status("Success", text) }
    let failure = (text, params) => {
      status("Error", text)
      console.error(text, params)
    }
    let payload = (name, data) => {
      data["Message"] = name
      data["JobId"] = msg["JobId"]
      ws.send(JSON.stringify(data))
    }
    let configuration = () => {
      account.getUserData(user, payload, status)
    }
    if (msg["Message"] === "GetUserData") {
      configuration()
    }
    else if (msg["Message"] === "Search") {
      search.search(msg["Query"], payload, failure)
    }
    else if (msg["Message"] === "CreateTag") {
      tags.create(msg["Tag"], msg["Parent"], configuration, failure)
    }
    else if (msg["Message"] === "ActivateTag") {
      tags.activate(msg["Tag"], configuration, failure)
    }
    else if (msg["Message"] === "DeactivateTag") {
      tags.deactivate(msg["Tag"], configuration, failure)
    }
    else if (msg["Message"] === "RemoveTag") {
      tags.remove(msg["Tag"], configuration, failure)
    }
    else if (msg["Message"] === "RenameTag") {
      tags.rename(msg["From"], msg["To"], msg["Parent"], configuration, failure)
    }
    else if (msg["Message"] === "DisableCards") {
      tags.disableCards(msg["Tag"], success, failure)
    }
    else if (msg["Message"] === "EnableCards") {
      tags.enableCards(msg["Tag"], success, failure)
    }
    else if (msg["Message"] === "CreateCard") {
      cards.create(msg["Card"], success, failure)
    }
    else if (msg["Message"] === "UpdateCard") {
      cards.update(msg["CardId"], msg["Card"], success, failure)
    }
    else if (msg["Message"] === "RemoveCard") {
      cards.remove(msg["CardId"], success, failure)
    }
    else if (msg["Message"] === "GetCard") {
      cards.get(msg["CardId"], payload, failure)
    }
    else if (msg["Message"] === "GetNextCard") {
      user.collection("Cards").where("Queue", ">", 0).where("Disabled", "==", false).orderBy("Queue").limit(1).get().then(snapshot => {
        if (snapshot.empty) {
          failure("Nothing to learn")
        } else {
          let doc = snapshot.docs[0]
          payload("NextCard", {
            "Card": doc.data(),
            "CardId": doc.id
          })
          let today = new Date()
          let tomorrow  = new Date()
          tomorrow.setDate(today.getDate() + 1)
          doc.ref.update({
            "Queue": Firestore.FieldValue.delete(),
            "AvailableFrom": tomorrow,
            "LastHit": today
          })
        }
      }).catch(error => {
          failure("Failed to get the next card", { error })
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
            "Hits": Firestore.FieldValue.increment(1),
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
      failure("Unknown request")
    }
  })
})

console.log("Starting...")
server.listen(443)
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers["host"] })
  res.end()
}).listen(80)
