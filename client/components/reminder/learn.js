import prismjs from "components/prismjs"

export default {
  props: [ "card" ],
  mixins: [ prismjs ],
  mounted() {
    this.highlight(this.$el)
    this.$bus.$emit("Graded", true)
  }
}
