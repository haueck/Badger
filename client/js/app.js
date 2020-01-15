import vue from "vue"
import store from "store"
import router from "vue-router"
import learn from "components/learn"
import add from "components/add"
import edit from "components/edit"
import toasts from "components/toasts"
import tags from "components/tags"
import search from "components/search"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "css/main.css"
import "css/large.css"
import "css/small.css"

let broker = new vue()
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
    value: (name, payload, callback) => {
      payload["Message"] = name
      broker.$emit("Call", payload, callback)
    }
  }
})

vue.use(router)
let routes = [
  { path: "/learn", component: learn },
  { path: "/tags", component: tags },
  { path: "/add", component: add },
  { path: "/edit/:id", component: edit },
  { path: "/search", component: search },
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
      this.$bus.$on("Status", message => {
        this.$toast(message["Level"], message["Text"])
      })
      this.ws = new WebSocket("wss://" + location.host)
      this.ws.onopen = () => {
        this.$bus.$on("Call", (message, callback) => {
          this.$store.commit("createJob", callback)
          message["JobId"] = this.$store.getters.jobId
          this.ws.send(JSON.stringify(message))
        })
        this.$call("GetUserData", {})
      }
      this.ws.onmessage = event => {
        try {
          let msg = JSON.parse(event.data)
          let name = msg["Message"]
          this.$store.dispatch("completeJob", msg)
          delete msg["Message"]
          delete msg["JobId"]
          this.$bus.$emit(name, msg)
        }
        catch(error) {
          console.error("Failed to parse an incoming message: ", error)
        }
      }
    },
    destroyed() {
      this.ws.close()
    }
  })
})
