import firestore from "@google-cloud/connect-firestore"
import secrets from "./secrets.mjs"
import session from "express-session"

class Store extends session.Store {
  constructor(options) {
    super()
    this.db = options.database
    this.firestore = new firestore.FirestoreStore({ dataset: options.database })
    this.collection = this.db.collection(this.firestore.kind)
  }

  get(sid, callback) {
    this.firestore.get(sid, callback)
  }

  destroy(sid, callback) {
    this.firestore.destroy(sid, callback)
  }

  set(sid, session, callback) {
    this.firestore.set(sid, session, error => {
      if (error) {
        console.error(error)
        callback(error)
      }
      else {
        this.collection.doc(sid).set({ Expires: session.cookie.expires }, { merge: true }).then(() => {
          callback()
        }).catch(error => {
          console.error(error)
          callback(error)
        })
      }
    })
  }
}

export default class {
  constructor(options) {
    this.parser = session({
      store: new Store({ database: options.database }),
      resave: false,
      saveUninitialized: true,
      secret: secrets["Sessions"],
      cookie: {
        maxAge: 30*24*60*60*1000
      }
    })
  }
}
