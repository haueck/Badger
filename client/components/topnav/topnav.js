import md5 from "md5"
import logo from "components/logo"

export default {
  components: { logo },
  computed: {
    smallAvatar() {
      let hash = md5(this.$store.getters.user("Email"))
      return "https://www.gravatar.com/avatar/" + hash + "?s=40&d=robohash"
    },
    mediumAvatar() {
      let hash = md5(this.$store.getters.user("Email"))
      return "https://www.gravatar.com/avatar/" + hash + "?s=100&d=robohash"
    },
    name() {
      return this.$store.getters.user("Firstname") + " " + this.$store.getters.user("Lastname")
    },
    email() {
      return this.$store.getters.user("Email")
    },
    jobCount() {
      return this.$store.getters.jobCount
    }
  }
}
