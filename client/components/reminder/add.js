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
      "Reminder": "",
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
      vue.set(this.card, "SearchPhrases", this.$parent.dehtmlize(this.card["Reminder"]))
      this.$parent.saveCard()
    }
  },
  destroyed() {
    this.$bus.$off("FinalizeCard", this.finalizeCard)
  }
}
