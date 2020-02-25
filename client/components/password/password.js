export default {
  data() {
    return {
      error: false,
      working: false,
      success: false
    }
  },
  methods: {
    validate(event) {
      if (this.working) {
        return
      }
      event.preventDefault()
      event.stopPropagation()
      let form = event.target
      if (form.checkValidity()) {
        form.classList.remove("was-validated")
        this.submit(form)
      }
      else {
        form.classList.add("was-validated")
      }
    },
    submit(form) {
      this.error = false
      this.success = false
      this.working = true
      let formData = new FormData(form)
      let xhr = new XMLHttpRequest()
      xhr.open("POST", "/reset-password")
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          try {
            if (xhr.status !== 200) {
              throw "Server side error: " + xhr.status
            }
            this.success = JSON.parse(xhr.responseText)["Success"]
            this.error = !this.success
            this.working = false
          }
          catch(error) {
            this.error = true
          }
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
