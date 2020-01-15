import vue from "vue"
import signin from "components/signin"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "css/main.css"
import "css/large.css"
import "css/small.css"

window.addEventListener("load", () => {
  new vue({
    el: "#application",
    components: { signin },
    data() {
      return {}
    },
    mounted() {

    }
  })
})
