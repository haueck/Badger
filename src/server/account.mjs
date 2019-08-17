import sha from "js-sha512"
import crypto from "crypto"

export default class {
  constructor(options) {
    this.db = options.database
  }

  getUserData(ws, user) {
    user.get().then(doc => {
      if (doc.exists) {
        let data = doc.data()
        data["Message"] = "UserData"
        delete data["Password"]
        delete data["Salt"]
        ws.send(JSON.stringify(data))
      }
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
          Salt: salt,
          Revisions: [],
          DailyTarget: 25,
          Performance: [],
          Notes: "",
          Tags: {
            "€": {
              "Parent": false
            },
            "English": {
              "Count": 98,
              "Parent": "€"
            },
            "CAE": {
              "Count": 98,
              "Parent": "English"
            },
            "Algorithms": {
              "Count": 98,
              "Parent": "Computing"
            },
            "Architecture": {
              "Count": 33,
              "Parent": "Computing"
            },
            "Articles": {
              "Count": 80,
              "Parent": "English"
            },
            "Artificial Intelligence": {
              "Count": 10,
              "Parent": "Computing"
            },
            "Biology": {
              "Count": 9,
              "Parent": "€"
            },
            "C++": {
              "Count": 100,
              "Parent": "Computing"
            },
            "Computing": {
              "Count": 444,
              "Parent": "€"
            },
            "Conditionals": {
              "Count": 33,
              "Parent": "English"
            },
            "Dance": {
              "Count": 7,
              "Parent": "€"
            },
            "Databases": {
              "Count": 46,
              "Parent": "Computing"
            },
            "Design Patterns": {
              "Count": 22,
              "Parent": "Computing"
            },
            "Economy": {
              "Count": 5,
              "Parent": "€"
            },
            "Electronics": {
              "Count": 3,
              "Parent": "€"
            },
            "Emphasis": {
              "Count": 33,
              "Parent": "English"
            },
            "English Excercise": {
              "Count": 521,
              "Parent": "English"
            },
            "English Grammar": {
              "Count": 90,
              "Parent": "English"
            },
            "English Usage": {
              "Count": 142,
              "Parent": "English"
            },
            "English Writing": {
              "Count": 43,
              "Parent": "English"
            },
            "Film": {
              "Count": 79,
              "Parent": "€"
            },
            "Food": {
              "Count": 47,
              "Parent": "€"
            },
            "Future Tense": {
              "Count": 32,
              "Parent": "English"
            },
            "Geography": {
              "Count": 12,
              "Parent": "€"
            },
            "Hangeul": {
              "Count": 41,
              "Parent": "€"
            },
            "Health": {
              "Count": 2,
              "Parent": "€"
            },
            "History": {
              "Count": 4,
              "Parent": "€"
            },
            "Ideas": {
              "Count": 9,
              "Parent": "€"
            },
            "Interesting": {
              "Count": 30,
              "Parent": "€"
            },
            "Interview": {
              "Count": 59,
              "Parent": "€"
            },
            "Inversion": {
              "Count": 41,
              "Parent": "English"
            },
            "Korea": {
              "Count": 4,
              "Parent": "€"
            },
            "Korean Excercise": {
              "Count": 18,
              "Parent": "€"
            },
            "Korean Grammar": {
              "Count": 12,
              "Parent": "€"
            },
            "Kształcenie Głosu": {
              "Count": 2,
              "Parent": "€"
            },
            "Law": {
              "Count": 1,
              "Parent": "€"
            },
            "Literature": {
              "Count": 5,
              "Parent": "€"
            },
            "Management": {
              "Count": 25,
              "Parent": "€"
            },
            "Math": {
              "Count": 42,
              "Parent": "€"
            },
            "Modals": {
              "Count": 85,
              "Parent": "English"
            },
            "Music": {
              "Count": 1,
              "Parent": "€"
            },
            "Passive": {
              "Count": 34,
              "Parent": "English"
            },
            "Past Tense": {
              "Count": 30,
              "Parent": "English"
            },
            "Personal development": {
              "Count": 26,
              "Parent": "€"
            },
            "Physics": {
              "Count": 13,
              "Parent": "€"
            },
            "Polish": {
              "Count": 34,
              "Parent": "€"
            },
            "Politics": {
              "Count": 1,
              "Parent": "€"
            },
            "Prepositions": {
              "Count": 3,
              "Parent": "English"
            },
            "Present Perfect": {
              "Count": 25,
              "Parent": "English"
            },
            "Present Tense": {
              "Count": 32,
              "Parent": "English"
            },
            "Psychology": {
              "Count": 82,
              "Parent": "€"
            },
            "Relative clauses": {
              "Count": 20,
              "Parent": "English"
            },
            "Reporting": {
              "Count": 37,
              "Parent": "English"
            },
            "Skiing": {
              "Count": 3,
              "Parent": "€"
            },
            "Sport": {
              "Count": 3,
              "Parent": "€"
            },
            "Subjunctives": {
              "Count": 3,
              "Parent": "English"
            },
            "System Design": {
              "Count": 19,
              "Parent": "Computing"
            },
            "Telecommunication": {
              "Count": 4,
              "Parent": "€"
            },
            "Television": {
              "Count": 1,
              "Parent": "€"
            },
            "Unreal tenses": {
              "Count": 37,
              "Parent": "English"
            },
            "Verb + infinitve or -ing": {
              "Count": 29,
              "Parent": "English"
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
    res.redirect("/")
  }
}
