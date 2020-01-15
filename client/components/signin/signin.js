export default {
  data() {
    return {
      error: false,
      working: false,
      emailExists: false,
      invalidInput: false,
      invalidCredentials: false
    }
  },
  mounted() {
    let iterator = document.evaluate("//input", document)
    let node = iterator.iterateNext()
    while (node) {
      node.addEventListener("invalid", event => {
        if (event.target.validity.valueMissing) {
          event.target.setCustomValidity("This field is required")
        }
      })
      node.addEventListener("change", event => {
        event.target.setCustomValidity("")
        event.target.checkValidity()
      })
      node.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
          event.preventDefault()
          event.target.blur()
          event.target.form.button.click()
        }
      })
      node = iterator.iterateNext()
    }
    $("a[data-toggle='tab']").on("shown.bs.tab", () => { this.initialize() })
  },
  methods: {
    initialize() {
      this.error = false
      this.working = false
      this.emailExists = false
      this.invalidInput = false
      this.invalidCredentials = false
    },
    check(form) {
      let valid = true
      for (let element of form.elements) {
        valid = element.checkValidity() && valid
      }
      return valid
    },
    submit(event, url) {
      if (this.working) {
        return
      }
      this.initialize()
      if (!this.check(event.target.form)) {
        this.invalidInput = true
        return
      }
      this.working = true
      let formData = new FormData(event.target.form)
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
              this.invalidInput = response["InvalidInput"]
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
  }
}
