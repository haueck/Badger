import vue from "vue"
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
  mounted () {
  },
  methods: {
    add() {
      let msg = {
        "Message": "AddCard",
        "Card": this.card
      }
      this.$bus.$emit("send", msg)
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
      vue.nextTick(() => {
        this.$refs.example[last].focus()
      })
    }
  }
}
