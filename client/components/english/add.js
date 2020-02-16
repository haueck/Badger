import vue from "vue"
import concealing from "components/concealing"
import alternatives from "components/alternatives"

export default {
  data () {
    return {
      examples: []
    }
  },
  components: { alternatives },
  mixins: [ concealing ],
  props: [ "card" ],
  created() {
    let defaults = {
      "Word": "",
      "Definition": "",
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
      "Derogatory": false
    }
    for (let key in defaults) {
      if (!(key in this.card)) {
        vue.set(this.card, key, defaults[key])
      }
    }
    for (let i = 0; i < this.card["Examples"].length; ++i) {
      vue.set(this.examples, i, this.concealWords(this.card["Examples"][i], this.words()))
    }
    this.$bus.$on("FinalizeCard", this.finalizeCard)
  },
  methods: {
    finalizeCard() {
      let regex = new RegExp(/\w/)
      for (let i = 0; i < this.card["Examples"].length;) {
        if (this.card["Examples"][i].match(regex)) {
          ++i
        }
        else {
          this.card["Examples"].splice(i, 1)
          this.examples.splice(i, 1)
        }
      }
      for (let i = 0; i < this.card["Related"].length;) {
        if (this.card["Related"][i]["Word"].match(regex)) {
          ++i
        }
        else {
          this.card["Related"].splice(i, 1)
        }
      }
      let texts = [ this.card["Word"], this.card["Definition"] ].concat(this.card["Examples"]).concat(this.card["Related"].map(r => r["Word"]))
      vue.set(this.card, "SearchPhrases", texts)
      this.$parent.saveCard()
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
      this.examples.push("")
      vue.nextTick(() => {
        this.$refs.example[last].focus()
      })
    },
    words() {
      let list = this.card["Related"].filter(related => related["Visibility"] == "Hide").map(related => related["Word"])
      list.unshift(this.card["Word"])
      return this.prepareWords(list)
    },
    replaceExample(index) {
      this.card["Examples"][index] = this.examples[index]
      vue.set(this.examples, index, this.concealWords(this.examples[index], this.words()))
    },
    restoreExample(index) {
      vue.set(this.examples, index, this.card["Examples"][index])
    },
    updateExamples() {
      for (let i = 0; i < this.examples.length; ++i) {
        this.restoreExample(i)
        this.replaceExample(i)
      }
    },
    relatedChanged(index) {
      if (this.card["Related"][index]["Visibility"] == "Hide") {
        this.updateExamples()
      }
    }
  },
  destroyed() {
    this.$bus.$off("FinalizeCard", this.finalizeCard)
  }
}
