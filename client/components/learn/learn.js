import vue from "vue"
import question from "components/question/learn.vue"
import reminder from "components/reminder/learn.vue"
import english from "components/english/learn.vue"
import multiplechoice from "components/multiplechoice/search.vue"

export default {
  components: { question, english, reminder, multiplechoice },
  data() {
    return {
      card: {
        "Type": ""
      }
    }
  },
  mounted() {
    this.$bus.$on("NextCard", message => {
      vue.set(this, "card", message["Card"])
      this.id = message["CardId"]
    })
    this.$bus.$on("GetNextCard", () => {
      vue.set(this.card, "Type", "")
      this.getNextCard()
    })
    this.$bus.$on("Graded", pass => {
      vue.set(this.card, "Pass", pass)
      vue.set(this.card, "Graded", true)
      vue.nextTick(() => {
        this.$refs.next.focus()
      })
      this.sendResult(pass)
    })
    this.getNextCard()
  },
  methods: {
    sendResult(pass) {
      this.$call("Result", { "CardId": this.id, "Pass": pass })
    },
    getNextCard() {
      this.$call("GetNextCard", {})
    }
  },
  computed: {
    currentComponent() {
      return this.card["Type"].toLowerCase()
    },
    lastHit() {
      let date = new Date(1000 * this.card["LastHit"]["_seconds"])
      return date.toString()
    }
  }
}
