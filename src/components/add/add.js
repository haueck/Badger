import question from "components/question/add.vue"
import english from "components/english/add.vue"

export default {
  components: { question, english },
  data() {
    return {
      selected: "None",
      card: {
        "Type": "None"
      }
    }
  },
  mounted() {
  }
}
