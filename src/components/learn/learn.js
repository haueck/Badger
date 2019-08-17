import vue from "vue"
import question from "components/question/learn.vue"
import english from "components/english/learn.vue"

export default {
  components: { question, english },
  data() {
    return {
      card: {}
    }
  },
  beforeMount() {
    this.initCard()
  },
  mounted() {
    this.$bus.$on("NextCard", message => {
      vue.set(this, "card", message["Card"])
      this.id = message["CardId"]
    })
    this.$bus.$on("GetNextCard", () => {
      this.initCard()
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
      this.$call("GetNextCard")
    },
    initCard() {
      vue.set(this.card, "Type", "None")
    }
  }
}
