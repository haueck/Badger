import vue from "vue"
import tinymce from "components/tinymce"
import draggable from "vuedraggable"
import alternatives from "components/alternatives"

export default {
  data () {
    return {
      dragging: false,
      trash: [],
      icon: null
    }
  },
  props: [ "card" ],
  components: { tinymce, alternatives, draggable },
  mounted () {
    let defaults = {
      "Question": "",
      "Explanation": "",
      "Unordered": false,
      "Answers": [{
        "Value": "",
        "Optional": false,
        "Brackets": false
      }]
    }
    for (let key in defaults) {
      if (!(key in this.card)) {
        vue.set(this.card, key, defaults[key])
      }
    }
  },
  methods: {
    add() {
      this.$call("AddCard", { "Card": this.card })
    },
    addAnswer() {
      let last = this.card["Answers"].length
      this.card["Answers"].push({
        "Value": "",
        "Optional": false,
        "Brackets": false
      })
      vue.nextTick(() => {
        this.$refs.answer[last].focus()
      })
    },
    onStart() {
      this.dragging = true
      vue.nextTick(() => {
        this.icon = this.$el.getElementsByClassName("fa-trash-alt")[0]
        let height = this.$el.getElementsByClassName("trash")[0].clientHeight
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
