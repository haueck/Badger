import vue from "vue"
import store from "store"
import router from "vue-router"
import learn from "components/learn"
import add from "components/add"
import toasts from "components/toasts"
import tags from "components/tags"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "css/main.css"
import "css/large.css"
import "css/small.css"

const broker = new vue()
Object.defineProperties(vue.prototype, {
  $bus: {
    get() { return broker }
  },
  $toast: {
    value: (level, msg) => {
      broker.$emit("Toast", { "Level": level, "Message": msg })
    }
  },
  $call: {
    value: (name, payload) => {
      payload["Message"] = name
      broker.$emit("Call", payload)
    }
  }
})

vue.use(router)
let routes = [
  { path: "/learn", component: learn },
  { path: "/tags", component: tags },
  { path: "/add", component: add }
]

window.addEventListener("load", () => {
  new vue({
    el: "#application",
    store: store,
    router: new router({ routes }),
    components: { toasts },
    data() {
      return {
          ws: Object
      }
    },
    mounted() {
      this.$bus.$on("UserData", message => {
        this.$store.commit("initialize", message)
      })
      this.$bus.$on("Error", message => {
        this.$toast("Error", message["Text"])
      })
      this.ws = new WebSocket("ws://" + location.host)
      this.ws.onopen = () => {
        this.ws.send(JSON.stringify({ "Message": "GetUserData" }))
        this.$bus.$on("Call", message => {
          this.ws.send(JSON.stringify(message))
        })
      }
      this.ws.onmessage = event => {
        let msg = JSON.parse(event.data)
        let name = msg["Message"]
        delete msg["Message"]
        this.$bus.$emit(name, msg)
      }
    },
    destroyed() {
      this.ws.close()
    }
  })
})
