import vue from "vue"
import contractions from "components/contractions"
import alternatives from "components/alternatives"

export default {
  data () {
    return {
      answers: [],
      feedback: [],
      count: 0
    }
  },
  mixins: [ alternatives, contractions ],
  props: [ "card" ],
  components: { },
  mounted () {
    this.count = this.card["Answers"].length
    vue.set(this, "feedback", new Array(this.count))
    vue.set(this, "answers", new Array(this.count))
    vue.nextTick(() => {
      this.$refs.answer[0].focus()
    })
  },
  methods: {
    verify() {
      let correct = 0
      if (this.card["Unordered"]) {
        let used = new Array(this.count)
        for (let i = 0; i < this.count; i++) {
          for (let j = 0; j < this.count; j++) {
            if (!used[j]) {
              let feedback = this.compare(this.card["Answers"][j]["Value"], this.answers[i], this.card["Raw"])
              if (feedback["Pass"]) {
                this.feedback[i] = feedback
                used[j] = true
                correct++
                break
              }
            }
          }
        }
        for (let i = 0; i < this.count; i++) {
          if (!used[i]) {
            for (let j = 0; j < this.count; j++) {
              if (this.feedback[j] == null) {
                this.feedback[j] = this.compare(this.card["Answers"][i]["Value"], this.answers[j], this.card["Raw"])
                break
              }
            }
          }
        }
      } else {
        for (let i = 0; i < this.count; i++) {
          this.feedback[i] = this.compare(this.card["Answers"][i]["Value"], this.answers[i], this.card["Raw"])
          if (this.feedback[i]["Pass"]) {
            correct++
          }
        }
      }
      this.$bus.$emit("Graded", correct == this.count)
    },
    compare(expectedAnswer, providedAnswer, raw) {
      let expected = []
      let provided = []
      let possible = []
      let correct = []
      if (raw) {
        expected.push(expectedAnswer)
        provided.push(providedAnswer)
      } else {
        let set1 = new Set(this.alternatives(expectedAnswer))
        let set2 = new Set(this.alternatives(providedAnswer))
        set1.forEach(x => expected.push(x))
        set2.forEach(x => provided.push(x))
      }
      let matched = provided.map(() => false)
      for (let j = 0; j < expected.length; ++j) {
        let match = null
        let expected1 = this.expand(expected[j])
        for (let k = 0; k < provided.length; ++k) {
          let provided1 = this.expand(provided[k])
          if (expected1.filter(x => provided1.includes(x)).length > 0) {
            match = k
            break
          }
        }
        if (match == null) {
          possible.push(expected[j])
        } else {
          correct.push(provided[match])
          matched[match] = true
        }
      }
      let wrong = provided.filter((x, index) => !matched[index])
      return {
        "Expected": expectedAnswer,
        "Correct": correct,
        "Possible": possible,
        "Wrong": wrong,
        "Pass": wrong.length == 0
      }
    }
  }
}
