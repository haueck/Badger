export default {
  data () {
    return { }
  },
  props: [ "card" ],
  mounted () {
    this.$bus.$emit("Graded", true)
  }
}
