import vue from "vue"
import store from "store"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.css"
import "css/main.css"

const broker = new vue()

Object.defineProperties(vue.prototype, {
  $bus: {
    get() {
      return broker
    }
  }
})

window.addEventListener("load", () => {
  new vue({
    el: "#application",
    store: store,
    components: {},
    data() {
      return {}
    },
    mounted() {
      console.log("Mounted")
    },
    methods: {}
  })
})
