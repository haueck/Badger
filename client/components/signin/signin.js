export default {
  data() {
    return {
      error: false,
      working: false,
      emailExists: false,
      invalidCredentials: false
    }
  },
  mounted() {
    $("a[data-toggle='tab']").on("shown.bs.tab", this.initialize)
  },
  methods: {
    validate(event, url) {
      event.preventDefault()
      event.stopPropagation()
      let form = event.target
      if (form.checkValidity()) {
        form.classList.remove("was-validated")
        this.submit(form, url)
      }
      else {
        form.classList.add("was-validated")
      }
    },
    initialize() {
      this.error = false
      this.working = false
      this.emailExists = false
      this.invalidCredentials = false
    },
    submit(form, url) {
      if (this.working) {
        return
      }
      this.initialize()
      this.working = true
      let formData = new FormData(form)
      let xhr = new XMLHttpRequest()
      xhr.open("POST", url)
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          try {
            if (xhr.status !== 200) {
              throw "Server side error: " + xhr.status
            }
            let response = JSON.parse(xhr.responseText)
            if (response["Success"]) {
              window.location.replace("/")
              return
            }
            else {
              this.error = response["Error"]
              this.emailExists = response["EmailExists"]
              this.invalidCredentials = response["InvalidCredentials"]
            }
          }
          catch(error) {
            this.error = true
          }
          this.working = false
        }
      }
      let pairs = []
      for (let key of formData.keys()) {
        pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(formData.get(key)))
      }
      xhr.send(pairs.join("&"))
    }
  },
  destroyed() {
    $("a[data-toggle='tab']").off("shown.bs.tab")
  }
}
