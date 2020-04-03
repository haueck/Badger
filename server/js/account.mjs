import sha from "js-sha512"
import crypto from "crypto"
import moment from "moment-timezone"
import secrets from "./secrets.mjs"
import sendgrid from "@sendgrid/mail"
import Firestore from "@google-cloud/firestore"

export default class {
  constructor(options) {
    this.db = options.database
  }

  getUserData(user, success, failure) {
    user.get().then(doc => {
      if (doc.exists) {
        let data = doc.data()
        let progress = 25 * Math.floor(data["Hits"] / data["TodaysTarget"] / 0.25)
        delete data["Password"]
        delete data["Salt"]
        data["TodaysProgress"] = data["Hits"] == 0 ? 0 : Math.min(100, Math.max(10, progress))
        success("UserData", data)
      }
      else {
        failure("Failed to get user data")
      }
    }).catch(error => {
      failure("Failed to get user data", { error })
    })
  }

  getTimezones(success) {
    success("Timezones", { Timezones: moment.tz.names() })
  }

  update(user, msg, success, failure) {
    let bonus = Math.round(msg["DailyTarget"] * (0.2 * Math.random() - 0.1))
    user.update({
      Firstname: msg["Firstname"],
      Lastname: msg["Lastname"],
      Email: msg["Email"],
      Timezone: msg["Timezone"],
      DailyTarget: Number(msg["DailyTarget"]),
      TodaysTarget: Number(msg["DailyTarget"]) + bonus
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to update your account", error)
    })
  }

  changePassword(user, password, success, failure) {
    user.get().then(doc => {
      if (doc.exists) {
        return user.update({
          Password: sha.sha512(password + doc.data()["Salt"])
        })
      }
      else {
        throw new Error("Failed to get user data")
      }
    }).then(() => {
      success()
    }).catch(error => {
      failure("Failed to get user data", { error })
    })
  }

  resetPasswordLink(req, res) {
    this.db.collection("Users").where("Email", "=", (req.body.email || "None")).get().then(snapshot => {
      if (!snapshot.empty) {
        let token = sha.sha512(req.body.email + Math.random())
        let html = "<p>Hey there,</p><p>Someone requested a new password for your Badger account: "
        html += "<a href=\"https://boldh.com/reset-password-form/" + token + "\">reset link</a></p><p>Have fun!</p>"
        sendgrid.setApiKey(secrets["Sendgrid"])
        return sendgrid.send({
          to: req.body.email,
          from: "passwords@badger-sett.com",
          subject: "Choose a new password for Badger",
          html: html
        }).then(() => {
          return snapshot.docs[0].ref.update({ Token: token })
        })
      }
    }).then(() => {
      res.send({ Success: true })
    }).catch(error => {
      console.warn("Failed to generate a reset link", error)
      res.send({
        Success: false,
        Error: true
      })
    })
  }

  resetPassword(req, res) {
    this.db.collection("Users").where("Token", "=", (req.body.token || "None")).get().then(snapshot => {
      if (!snapshot.empty) {
        return snapshot.docs[0].ref.update({
          Password: sha.sha512(req.body.password + snapshot.docs[0].data()["Salt"]),
          Token: Firestore.FieldValue.delete()
        }).then(() => {
          res.send({ Success: true })
        })
      }
      else {
        console.warn("Reset token not found: " + req.body.token)
        res.send({ Success: false })
      }
    }).catch(error => {
      console.warn("Failed to reset a password", error)
      res.send({ Success: false })
    })
  }

  signIn(req, res) {
    this.db.collection("Users").where("Email", "=", (req.body.email || "None")).get().then(snapshot => {
      if (snapshot.empty) {
        res.send({
          Success: false,
          InvalidCredentials: true
        })
      } else {
        let user = snapshot.docs[0].data()
        let provided = sha.sha512((req.body.password || "None") + user["Salt"])
        if (provided == user["Password"]) {
          req.session.user = snapshot.docs[0].id
          res.send({ Success: true })
        } else {
          res.send({
            Success: false,
            InvalidCredentials: true
          })
        }
      }
    }).catch(error => {
      console.error(error)
      res.send({
        Success: false,
        Error: true
      })
    })
  }

  signUp(req, res) {
    let valid = true
    for (let field of [ "firstname", "lastname", "email", "password", "terms" ]) {
      valid = valid && req.body[field]
    }
    valid = valid && req.body.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if (!valid) {
      res.send({
        Success: false,
        Error: true
      })
      return
    }
    this.db.collection("Users").where("Email", "=", req.body.email).get().then(snapshot => {
      if (snapshot.empty) {
        let salt = crypto.randomBytes(20).toString("hex")
        let user = {
          Email: req.body.email,
          Firstname: req.body.firstname,
          Lastname: req.body.lastname,
          Password: sha.sha512(req.body.password + salt),
          Salt: salt,
          Revisions: {},
          DailyTarget: 25,
          TodaysTarget: 25,
          Performance: [ 0, 0, 0, 0, 0, 0 ],
          Projects: 0,
          Hits: 0,
          LastCard: "English",
          LastTags: [],
          Tags: {
            "€": {
              "Parent": false
            }
          }
        }
        this.db.collection("Users").add(user).then(doc => {
          req.session.user = doc.id
          res.send({ Success: true })
        }).catch(error => {
          console.error(error)
          res.send({
            Success: false,
            Error: true
          })
        })
      } else {
        res.send({
          Success: false,
          EmailExists: true
        })
      }
    }).catch(error => {
      console.error(error)
      res.send({
        Success: false,
        Error: true
      })
    })
  }

  signOut(req, res) {
    delete req.session.user
    req.session.save(() => {
      res.redirect("/")
    })
  }
}
