import vue from "vue"
import question from "components/question/learn.vue"

export default {
  components: { question },
  data() {
    return {
      card: {
        "Type": "None"
      }
    }
  },
  mounted() {
    this.$bus.$on("NextCard", card => {
      vue.set(this, "card", card)
    })
    this.$bus.$emit("send", { "Message": "GetNextCard" })
  }
}
