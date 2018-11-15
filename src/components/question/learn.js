import vue from "vue"
import contractions from "kontractions"
import alternatives from "components/alternatives"

export default {
  data () {
    return {
      answers: [],
      feedback: [],
      correct: false,
      wrong: false
    }
  },
  mixins: [ alternatives ],
  props: [ "card" ],
  components: { },
  mounted () {
    vue.set(this, "answers", new Array(this.card["Answers"].length))
  },
  methods: {
    verify() {
      for (let i = 0; i < this.answers.length; i++) {
        let expected = []
        let supplied = []
        let possible = []
        let correct = []
        if (this.card["Answers"][i]["Raw"]) {
          expected.push(this.card["Answers"][i]["Value"])
          supplied.push(this.answers[i])
        } else {
          let set1 = new Set(this.alternatives(this.card["Answers"][i]["Value"]))
          let set2 = new Set(this.alternatives(this.answers[i]))
          set1.forEach(x => expected.push(x))
          set2.forEach(x => supplied.push(x))
        }
        let matched = supplied.map(() => false)
        for (let j = 0; j < expected.length; ++j) {
          let match = null
          let expected1 = contractions.expandToList(expected[j])
          for (let k = 0; k < supplied.length; ++k) {
            let supplied1 = contractions.expandToList(supplied[k])
            if (expected1.filter(x => supplied1.includes(x)).length > 0) {
              match = k
              break
            }
          }
          if (match == null) {
            possible.push(expected[j])
          } else {
            correct.push(supplied[match])
            matched[match] = true
          }
        }
        let feedback = {
          "Correct": correct,
          "Possible": possible
        }
        feedback["Wrong"] = supplied.filter((x, index) => !matched[index])
        this.feedback.push(feedback)
      }
      let wrongCount = this.feedback.reduce((accumulator, x) => accumulator + x["Wrong"].length, 0)
      if (wrongCount > 0) {
        this.wrong = true
      } else {
        this.correct = true
      }
    }
  }
}
