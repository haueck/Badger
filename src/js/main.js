import vue from "vue"
import store from "store"
import router from "vue-router"
import learn from "components/learn"
import add from "components/add"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "css/main.css"
import "css/large.css"
import "css/small.css"

const broker = new vue()
Object.defineProperties(vue.prototype, {
  $bus: {
    get() {
      return broker
    }
  }
})

vue.use(router)
let routes = [
  { path: '/learn', component: learn },
  { path: '/add', component: add }
]

window.addEventListener("load", () => {
  new vue({
    el: "#application",
    store: store,
    router: new router({ routes }),
    components: { },
    data() {
      return {
          ws: Object
      }
    },
    mounted() {
      this.ws = new WebSocket('ws://' + location.host)
      this.ws.onopen = (event) => {
        this.$bus.$on('send', (message) => {
          this.ws.send(JSON.stringify(message))
        })
      }
      this.ws.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        this.$bus.$emit(msg["Message"], msg)
        if (msg["Message"] === "Error") {
          console.log("Error")
        }
      }
    },
    methods: {},
    destroyed() {
      this.ws.close()
    }
  })
})
