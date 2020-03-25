import vue from "vue"
import question from "components/question/learn.vue"
import reminder from "components/reminder/learn.vue"
import english from "components/english/learn.vue"
import multiplechoice from "components/multiplechoice/learn.vue"

export default {
  components: { question, english, reminder, multiplechoice },
  data() {
    return {
      done: false,
      card: null
    }
  },
  mounted() {
    this.$bus.$on("NextCard", message => {
      if ("Card" in message) {
        this.$store.commit("incrementHits")
        vue.set(this, "card", message["Card"])
        this.id = message["CardId"]
      }
      else {
        vue.set(this, "done", true)
      }
    })
    this.$bus.$on("GetNextCard", () => {
      vue.set(this, "card", null)
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
      if (this.$route.query.revision) {
        this.$call("Revise", { "Revision": this.$route.query.revision })
      }
      else {
        this.$call("Learn", {})
      }
    }
  },
  computed: {
    currentComponent() {
      if (this.card) {
        return this.card["Type"].toLowerCase()
      }
      else {
        return null
      }
    },
    lastHit() {
      if (this.card && this.card["LastHit"]) {
        let date = new Date(1000 * this.card["LastHit"]["_seconds"])
        return "(last viewed on " + date.toLocaleString("en-GB") + ")"
      }
      else {
        return ""
      }
    },
    progress() {
      return this.$store.getters.user("TodaysProgress")
    }
  },
  watch: {
    $route() {
      this.$bus.$emit("GetNextCard")
    }
  },
  destroyed() {
    this.$bus.$off("NextCard")
    this.$bus.$off("GetNextCard")
    this.$bus.$off("Graded")
  }
}
