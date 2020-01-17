import vue from "vue"
import english from "components/english/search.vue"
import question from "components/question/search.vue"
import reminder from "components/reminder/search.vue"
import multiplechoice from "components/multiplechoice/search.vue"

export default {
  data() {
    return {
      query: "",
      results: []
    }
  },
  components: { english, question, reminder, multiplechoice },
  mounted() {
    vue.nextTick(() => {
      this.$refs.search.focus()
    })
  },
  methods: {
    search() {
      this.$call("Search", { "Query": this.query }, response => {
          vue.set(this, "results", [])
          for (let card of response["Results"]) {
            this.results.push(card)
          }
      })
    }
  }
}
