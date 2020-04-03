import logo from "components/logo"

export default {
  components: { logo },
  methods: {
    toggle() {
      $(this.$el).find(".sidenav").toggle()
    },
    hide() {
      $(this.$el).find(".sidenav").hide()
    }
  },
  computed: {
    jobCount() {
      return this.$store.getters.jobCount
    }
  }
}
