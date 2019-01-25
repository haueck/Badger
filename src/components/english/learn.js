import vue from "vue"
import contractions from "components/contractions"
import alternatives from "components/alternatives"

export default {
  data () {
    return {
      answer: "",
      possible: [],
      correct: [],
      wrong: [],
      complex: false,
      pass: false
    }
  },
  mixins: [ alternatives, contractions ],
  props: [ "card", "verified" ],
  components: { },
  mounted () {
    vue.nextTick(() => {
      this.$refs.answer.focus()
    })
  },
  methods: {
    verify() {
      let provided = this.alternatives(this.answer)
      let expected = this.alternatives(this.card["Word"])
      this.complex = expected.length > 1
      for (let phrase of expected) {
        let size  = this.correct.length
        for (let answer of provided) {
          if (answer === phrase) {
            this.correct.push(answer)
            break
          }
        }
        if (this.correct.length == size) {
          this.possible.push(phrase)
        }
      }
      for (let answer of provided) {
        if (!this.correct.includes(answer)) {
          this.wrong.push(answer)
        }
      }
      this.pass = this.wrong.length == 0
      this.$bus.$emit("Verified")
    }
  },
  computed: {
    grammar() {
      let map = {
        "PhrasalVerb": "phrasal verb",
        "Idiom": "idiom",
        "Formal": "formal",
        "Informal": "informal",
        "Approval": "approval",
        "Derogatory": "derogatory"
      }
      let active = Object.keys(map).filter(key => this.card[key])
      if (active.length > 0) {
        return "(" + active.map(x => map[x]).join(", ") + ")"
      }
      return ""
    }
  }
}
