import sha from "js-sha512"
import crypto from "crypto"

export default class {
  constructor(options) {
    this.db = options.database
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
        InvalidInput: true
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
          Salt: salt
        }
        this.db.collection("Users").add(user).then(doc => {
          req.session.user = doc.id
          res.send({ Success: true })
        }).catch(error => {
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
      res.send({
        Success: false,
        Error: true
      })
    })
  }

  signOut(req, res) {
    delete req.session.user
    res.redirect("/")
  }
}
