import vue from "vue"
import tinymce from "components/tinymce"
import draggable from "vuedraggable"
import alternatives from "components/alternatives"

export default {
  props: [ "card" ],
  components: { tinymce, alternatives, draggable },
  created() {
    let defaults = {
      "Explanation": "",
      "Unordered": false,
      "Question": "",
      "Answers": [ "" ],
      "Raw": false
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
      let texts = this.$parent.dehtmlize(this.card["Question"]).concat(this.card["Answers"])
      if (this.card["Explanation"]) {
          texts.push(this.card["Explanation"])
      }
      vue.set(this.card, "SearchPhrases", texts)
      this.$parent.saveCard()
    },
    addAnswer() {
      this.card["Answers"].push("")
      vue.nextTick(() => {
        $(".answer:last-child input").focus()
      })
    },
    removeAnswer(index) {
      this.card["Answers"].splice(index, 1)
    },
    toggle() {
      $(".collapse").toggle()
    }
  },
  computed: {
    single() {
      return this.card["Answers"].length == 1
    }
  },
  destroyed() {
    this.$bus.$off("FinalizeCard", this.finalizeCard)
  }
}
