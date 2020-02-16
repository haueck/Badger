import vue from "vue"
import english from "components/english/search.vue"
import question from "components/question/search.vue"
import reminder from "components/reminder/search.vue"
import multiplechoice from "components/multiplechoice/search.vue"

export default {
  data() {
    return {
      query: this.$route.query.query,
      page: this.$route.query.page || 1,
      results: [],
      pages: 1,
      empty: false
    }
  },
  components: { english, question, reminder, multiplechoice },
  mounted() {
    vue.nextTick(() => {
      this.$refs.search.focus()
    })
    if (this.query) {
      this.search()
    }
  },
  methods: {
    search() {
      this.$call("Search", {
        "Query": this.query,
        "Page": this.page
      }, response => {
        vue.set(this, "results", [])
        vue.set(this, "pages", response["Pages"])
        if (response["Results"].length == 0) {
          vue.set(this, "empty", true)
        }
        else {
          vue.set(this, "empty", false)
          for (let card of response["Results"]) {
            this.results.push(card)
          }
        }
      })
    },
    update() {
      this.$router.replace({ path: '/search', query: { query: this.query, page: this.page } })
    },
    changePage(page) {
      if (page != this.page) {
        this.page = page
        this.update()
        this.search()
      }
    },
    changeRevision(card, revision) {
      this.$call("AddCardToRevision", {
        "Card": card,
        "Revision": revision
      })
    }
  },
  computed: {
    revisions() {
      return Object.keys(this.$store.getters.user("Revisions")).sort()
    }
  }
}
