import vue from "vue"

export default {
  data() {
    return {
      query: ""
    }
  },
  mounted() {
    vue.nextTick(() => {
      this.$refs.search.focus()
    })
  },
  methods: {
    search() {
      this.$call("Search", { "Query": this.query }, response => { console.log(response) })
    }
  }
}
