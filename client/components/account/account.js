export default {
  data() {
    return {
      timezone: this.$store.getters.user("Timezone"),
      firstname: this.$store.getters.user("Firstname"),
      lastname: this.$store.getters.user("Lastname"),
      target: this.$store.getters.user("DailyTarget"),
      email: this.$store.getters.user("Email"),
      password: ""
    }
  },
  mounted() {
    if (this.$store.getters.timezones.length == 0) {
      this.$call("GetTimezones", {}, msg => { this.$store.commit("setTimezones", msg["Timezones"]) })
    }
  },
  methods: {
    update(event) {
      event.preventDefault()
      event.stopPropagation()
      let form = event.target
      if (form.checkValidity()) {
        form.classList.remove("was-validated")
        this.$call("UpdateAccount", {
          "Firstname": this.firstname,
          "Lastname": this.lastname,
          "Email": this.email,
          "DailyTarget": this.target,
          "Timezone": this.timezone
        }, () => { this.$toast("Success", "Your account has been updated") })
      }
      else {
        form.classList.add("was-validated")
      }
    },
    changePassword(event) {
      event.preventDefault()
      event.stopPropagation()
      let form = event.target
      if (form.checkValidity()) {
        form.classList.remove("was-validated")
        this.$call("ChangePassword", { "Password": this.password }, () => {
          this.$toast("Success", "Your password has been changed")
        })
      }
      else {
        form.classList.add("was-validated")
      }
    }
  },
  computed: {
    ready() {
      return this.$store.getters.timezones.length > 0
    }
  }
}
