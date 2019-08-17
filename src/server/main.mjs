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
const wss = new ws.Server({ noServer: true })
const db = new firestore({ projectId: secrets["ProjectId"]})
let session = new Session({ database: db })
let account = new Account({ database: db })

app.use(express.static("public"))
app.use(parser.urlencoded({ extended: true }))
app.use(session.parser)
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
  ws.on("message", message => {
    let msg = JSON.parse(message)
    if (msg["Message"] === "GetUserData") {
      account.getUserData(ws, user)
    }
    else if (msg["Message"] === "ActivateTag") {
      user.update({ ["Tags." + msg["Tag"] + ".Inactive"]: firestore.FieldValue.delete() }).then(() => {
        account.getUserData(ws, user)
      })
    }
    else if (msg["Message"] === "DeactivateTag") {
      user.update({ ["Tags." + msg["Tag"] + ".Inactive"]: true }).then(() => {
        account.getUserData(ws, user)
      })
    }
    else if (msg["Message"] === "RemoveTag") {
      user.collection("Cards").where("Tags", "array-contains", msg["Tag"]).get().then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.update({ "Tags": firestore.FieldValue.arrayRemove(msg["Tag"]) })
        })
      }).catch(error => {
          console.error("Error getting cards: ", error)
      })
      user.update({ ["Tags." + msg["Tag"]]: firestore.FieldValue.delete() }).then(() => {
        account.getUserData(ws, user)
      })
    }
    else if (msg["Message"] === "RenameTag") {
      user.get().then(doc => {
        let tags = doc.data()["Tags"]
        if (msg["To"] in tags) {
          ws.send(JSON.stringify({ "Message": "Error", "Text": "Tag '" + msg["To"] + "' already exists" }))
          return
        }
        user.collection("Cards").where("Tags", "array-contains", msg["From"]).get().then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.update({ "Tags": firestore.FieldValue.arrayRemove(msg["From"]) }).then(() => {
              doc.ref.update({ "Tags": firestore.FieldValue.arrayUnion(msg["To"]) })
            })
          })
          let data = tags[msg["From"]]
          data["Count"] = snapshot.size
          let update = {
            ["Tags." + msg["From"]]: firestore.FieldValue.delete(),
            ["Tags." + msg["To"]]: data
          }
          for (let tag in tags) {
            if (tags[tag]["Parent"] == msg["From"]) {
              update["Tags." + tag + ".Parent"] = msg["To"]
            }
          }
          user.update(update).then(() => { account.getUserData(ws, user) })
        })
      }).catch(error => {
          console.error("Error getting cards: ", error)
      })
    }
    else if (msg["Message"] === "DisableCards") {
      user.collection("Cards").where("Tags", "array-contains", msg["Tag"]).get().then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.update({ "Disabled": true })
        })
        user.update({ ["Tags." + msg["Tag"] + ".Count"]: snapshot.size })
      }).catch(error => {
          console.error("Error disabling cards: ", error)
      })
    }
    else if (msg["Message"] === "EnableCards") {
      user.collection("Cards").where("Tags", "array-contains", msg["Tag"]).where("Disabled", "==", true).get().then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.update({ "Disabled": firestore.FieldValue.delete() })
        })
      }).catch(error => {
          console.error("Error enabling cards: ", error)
      })
    }
    else if (msg["Message"] === "AddCard") {
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
