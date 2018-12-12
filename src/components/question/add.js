import vue from "vue"
import tinymce from "components/tinymce"
import draggable from 'vuedraggable'
import alternatives from "components/alternatives"

export default {
  data () {
    return {
      dragging: false,
      trash: [],
      icon: null
    }
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
  components: { tinymce, alternatives, draggable },
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
    addAnswer() {
      this.card["Answers"].push({
        "Value": "",
        "Optional": false,
        "Brackets": false
      })
    },
    onStart() {
      this.dragging = true
      vue.nextTick(() => {
        this.icon = this.$el.getElementsByClassName("fa-trash-alt")[0]
        let height = this.$el.getElementsByClassName('trash')[0].clientHeight
        this.icon.style.lineHeight = height + "px"
      })
    },
    onEnd(evt) {
      if (evt.from !== evt.to) {
        this.trash.splice(0, 1)
      }
      setTimeout(() => {
        this.dragging = false
        this.icon.style.lineHeight = "auto"
      }, 100)
    },
    onMove(evt) {
      if (evt.from === evt.to) {
        this.icon.style.backgroundColor = "#ffe6e6"
      } else {
        this.icon.style.backgroundColor = "#ffcccc"
      }
    }
  }
}
