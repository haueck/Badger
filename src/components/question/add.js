import tinymce from "components/tinymce"
import vue from "vue"

export default {
  data () {
    return {}
  },
  props: {
    card: {
      type: Object,
      default() {
        return {
          "Type": "Question",
          "Learn": true,
          "Question": "",
          "Explanation": "",
          "Unordered": false,
          "Answers": [{
            "Value": "",
            "Optional": false,
            "Brackets": false
          }]
        }
      }
    }
  },
  components: { tinymce },
  mounted () {
  },
  methods: {
    add() {
      let msg = {
        "Message": "AddCard",
        "Card": this.card
      }
      this.$bus.$emit('send', msg)
    },
    addAnswer() {
      this.card["Answers"].push({
        "Value": "",
        "Optional": false,
        "Brackets": false
      })
    },
    removeAnswer(index) {
      if (this.card["Answers"].length > 1) {
        this.card["Answers"].splice(index, 1)
      }
    },
    moveDown(index) {
      if (index < this.card["Answers"].length - 1) {
        this.swapAnswers(index, index + 1)
      }
    },
    moveUp(index) {
      if (index > 0) {
        this.swapAnswers(index, index - 1)
      }
    },
    swapAnswers(i, j) {
      let temp = this.card["Answers"][i]
      vue.set(this.card["Answers"], i, this.card["Answers"][j])
      vue.set(this.card["Answers"], j, temp)
    }
  }
}
