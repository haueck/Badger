import vue from "vue"
import tinymce from "components/tinymce"

export default {
  data () {
    return {}
  },
  props: [ "card" ],
  components: { tinymce },
  created() {
    let defaults = {
      "Variation": "SingleResponse",
      "Question": "",
      "Answers": [ {
        "Correct": false,
        "Answer": ""
      } ]
    }
    for (let key in defaults) {
      if (!(key in this.card)) {
        vue.set(this.card, key, defaults[key])
      }
    }
    this.$bus.$on("FinalizeCard", this.finalizeCard)
  },
  methods: {
    finalizeCard() {
      if (this.card["Variation"] == "SingleResponse") {
        let selected = 0
        for (let answer of this.card["Answers"]) {
          if (answer["Correct"]) {
            selected++
          }
        }
        if (selected != 1) {
          this.$toast("Error", "Please select one option only")
          return
        }
      }
      let texts = [ this.card["Question"] ].concat(this.card["Answers"].map(a => a["Answer"]))
      vue.set(this.card, "SearchPhrases", texts)
      this.$parent.saveCard()
    },
    addAnswer() {
      let last = this.card["Answers"].length
      this.card["Answers"].push({
        "Correct": false,
        "Answer": ""
      })
      vue.nextTick(() => {
        this.$refs.answer[last].focus()
      })
    },
    removeAnswer(i) {
      this.card["Answers"].splice(i, 1)
    }
  },
  destroyed() {
    this.$bus.$off("FinalizeCard")
  }
}
