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
import Learn from "./learn.mjs"
import Search from "./search.mjs"
import Tasks from "./tasks.mjs"
import Todos from "./todos.mjs"
import Revisions from "./revisions.mjs"

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
app.post("/sign-in", account.signIn.bind(account))
app.post("/sign-up", account.signUp.bind(account))
app.post("/reset-password-link", account.resetPasswordLink.bind(account))
app.post("/reset-password", account.resetPassword.bind(account))
app.get("/sign-out", account.signOut.bind(account))
app.get(/\/.*/, (req, res) => {
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
  let revisions = new Revisions({ db, user })
  let tags = new Tags({ db, user })
  let learn = new Learn({ user })
  let search = new Search({ user })
  let cards = new Cards({ db, user, search })
  let tasks = new Tasks({ db, user })
  let todos = new Todos({ db, user })
  ws.on("message", message => {
    let msg = JSON.parse(message)
    let status = (level, text, success) => {
      ws.send(JSON.stringify({
        "Success": success,
        "JobId": msg["JobId"],
        "Message": "Status",
        "Level": level,
        "Text": text
      }))
    }
    let success = (text) => { status("Success", text, true) }
    let failure = (text, params) => {
      status("Error", text, false)
      console.error(text, params)
    }
    let payload = (name, data) => {
      data["Message"] = name
      data["JobId"] = msg["JobId"]
      data["Success"] = true
      ws.send(JSON.stringify(data))
    }
    let configuration = () => {
      account.getUserData(user, payload, failure)
    }
    if (msg["Message"] === "GetUserData") {
      configuration()
    }
    else if (msg["Message"] === "GetTimezones") {
      account.getTimezones(payload, failure)
    }
    else if (msg["Message"] === "UpdateAccount") {
      account.update(user, msg, configuration, failure)
    }
    else if (msg["Message"] === "ChangePassword") {
      account.changePassword(user, msg["Password"], configuration, failure)
    }
    else if (msg["Message"] === "GetTodos") {
      todos.get(payload, failure)
    }
    else if (msg["Message"] === "CreateTodo") {
      todos.create(msg["Todo"], configuration, failure)
    }
    else if (msg["Message"] === "ScheduleTodo") {
      todos.schedule(msg["Todo"], msg["Date"], success, failure)
    }
    else if (msg["Message"] === "FinishedTodo") {
      todos.finished(msg["Todo"], configuration, failure)
    }
    else if (msg["Message"] === "UpdateTodo") {
      todos.update(msg["TodoId"], msg["Todo"], payload, failure)
    }
    else if (msg["Message"] === "RemoveTodo") {
      todos.remove(msg["TodoId"], payload, failure)
    }
    else if (msg["Message"] === "RescheduleTodo") {
      todos.reschedule(msg["TodoId"], msg["Date"], payload, failure)
    }
    else if (msg["Message"] === "Search") {
      search.search(msg["Query"], msg["Page"], payload, failure)
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
    else if (msg["Message"] === "CreateRevision") {
      revisions.create(msg["Revision"], configuration, failure)
    }
    else if (msg["Message"] === "RemoveRevision") {
      revisions.remove(msg["Revision"], configuration, failure)
    }
    else if (msg["Message"] === "RenameRevision") {
      revisions.rename(msg["From"], msg["To"], configuration, failure)
    }
    else if (msg["Message"] === "AddTagToRevision") {
      revisions.addTag(msg["Tag"], msg["Revision"], configuration, failure)
    }
    else if (msg["Message"] === "AddCardToRevision") {
      revisions.addCard(msg["Card"], msg["Revision"], configuration, failure)
    }
    else if (msg["Message"] === "Learn") {
      learn.next(payload, failure)
    }
    else if (msg["Message"] === "Revise") {
      learn.revise(msg["Revision"], payload, failure)
    }
    else if (msg["Message"] === "Result") {
      learn.result(msg["CardId"], msg["Pass"], configuration, failure)
    }
    else if (msg["Message"] === "GetActiveTasks") {
      tasks.getActive(payload, failure)
    }
    else if (msg["Message"] === "GetInactiveTasks") {
      tasks.getIdle(payload, failure)
    }
    else if (msg["Message"] === "CreateProject") {
      tasks.createProject(msg["Name"], msg["Priority"], msg["Color"], msg["Status"], payload, failure)
    }
    else if (msg["Message"] === "CreateTask") {
      tasks.createTask(msg["Name"], msg["ProjectId"], msg["Description"], msg["Status"], payload, failure)
    }
    else if (msg["Message"] === "UpdateProject") {
      tasks.updateProject(msg["ProjectId"], msg["Name"], msg["Priority"], msg["Color"], msg["Status"], configuration, failure)
    }
    else if (msg["Message"] === "UpdateTasks") {
      tasks.updateTasks(msg, configuration, failure)
    }
    else if (msg["Message"] === "RemoveProject") {
      tasks.removeProject(msg["ProjectId"], configuration, failure)
    }
    else if (msg["Message"] === "RemoveTask") {
      tasks.removeTask(msg["ProjectId"], msg["TaskId"], configuration, failure)
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
