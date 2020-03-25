/*global process exports*/
const Firestore = require("@google-cloud/firestore")
const moment = require("moment-timezone")
const db = new Firestore({ projectId: process.env.GCP_PROJECT })

function findMidnights() {
  let timezones = moment.tz.names()
  let midnights = []
  let current = []
  let times = []
  for (let timezone of timezones) {
      times.push(moment.tz(timezone).format("HH:mm").split(":").concat([ timezone ]))
  }
  for (let time of times) {
    if ((time[0] == 23 && time[1] >= 50) || (time[0] == 0 && time[1] <= 10)) {
      if (current.length == 10) {
        midnights.push(current)
        current = []
      }
      current.push(time[2])
    }
  }
  if (current.length > 0) {
    midnights.push(current)
  }
  return midnights
}

function updateUsers(midnights) {
  let promises1 = []
  for (let subset of midnights) {
    promises1.push(db.collection("Users").where("Timezone", "in", subset).get().then(snapshot => {
      let promises2 = []
      snapshot.forEach(doc => {
        let user = doc.data()
        let bonus = Math.round(user["DailyTarget"] * (0.2 * Math.random() - 0.1))
        let stats = user["Performance"]
        stats.pop()
        stats.unshift(Math.min(100, Math.ceil(user["Hits"] / user["TodaysTarget"])))
        promises2.push(doc.ref.update({
          "TodaysTarget": user["DailyTarget"] + bonus,
          "Performance": stats,
          "Hits": 0
        }))
        console.log("Updating " + user["Email"])
      })
      return Promise.all(promises2)
    }))
  }
  return Promise.all(promises1)
}

exports.performance = (req, res) => {
  let midnights = findMidnights()
  return updateUsers(midnights).then(() => {
    res.send("OK")
  }).catch(error => {
    console.error(error)
    res.status(500).send("FAIL")
  })
}
