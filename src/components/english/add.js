import vue from "vue"
import examples from "components/examples"
import alternatives from "components/alternatives"

export default {
  data () {
    return {
    }
  },
  props: {
    card: {
      type: Object,
      default() {
        return {
          "Type": "English",
          "Word": "",
          "PartOfSpeech": "Noun",
          "Pronunciation" : "",
          "UseOfPrepositions" : "",
          "Examples": [ "" ],
          "FullExamples": [ "" ],
          "Related": [],
          "PhrasalVerb": false,
          "Idiom": false,
          "Formal": false,
          "Informal": false,
          "Approval": false,
          "Derogatory": false,
          "Learn": true
        }
      }
    }
  },
  components: { alternatives },
  mixins: [ examples ],
  mounted () {
  },
  methods: {
    add() {
      /*let msg = {
        "Message": "AddCard",
        "Card": this.card
      }
      this.$bus.$emit("send", msg)*/

    },
    ipa(event) {
      this.card["Pronunciation"] += event.target.textContent
      event.stopPropagation()
    },
    addRelated() {
      let last = this.card["Related"].length
      this.card["Related"].push({
        "Word": "",
        "Description": "",
        "Visibility": "Hide"
      })
      vue.nextTick(() => {
        this.$refs.related[last].focus()
      })
    },
    addExample() {
      let last = this.card["Examples"].length
      this.card["Examples"].push("")
      this.card["FullExamples"].push("")
      vue.nextTick(() => {
        this.$refs.example[last].focus()
      })
    },
    words() {
      let list = this.card["Related"].filter(related => related["Visibility"] == "Hide")
      list.unshift(this.card['Word'])
      return this.prepareWords(list)
    },
    replaceExample(index) {
      this.card["FullExamples"][index] = this.card["Examples"][index]
      vue.set(this.card["Examples"], index, this.concealWords(this.card["Examples"][index], this.words()))
    },
    restoreExample(index) {
      vue.set(this.card["Examples"], index, this.card["FullExamples"][index])
    },
    updateExamples() {
      for (let i = 0; i < this.card["Examples"].length; ++i) {
        this.replaceExample(i)
      }
    },
    relatedChanged(index) {
      if (this.card["Related"][index]["Visibility"] == "Hide") {
        this.updateExamples()
      }
    }
  }
}
