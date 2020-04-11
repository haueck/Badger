import vue from "vue"
import store from "store"
import router from "vue-router"
import add from "components/add"
import edit from "components/edit"
import home from "components/home"
import tags from "components/tags"
import learn from "components/learn"
import todos from "components/todos"
import search from "components/search"
import sprint from "components/sprint"
import notfound from "components/notfound"
import account from "components/account"
import planning from "components/planning"
import revisions from "components/revisions"
import dashboard from "components/dashboard"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "prismjs/themes/prism.css"

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
    value: (name, payload, success, failure) => {
      payload["Message"] = name
      broker.$emit("Call", payload, success, failure)
    }
  }
})

vue.use(router)
let routes = [
  { path: "/", component: dashboard },
  { path: "/revise", component: learn },
  { path: "/learn", component: learn },
  { path: "/tags", component: tags },
  { path: "/add", component: add },
  { path: "/edit/:id", component: edit },
  { path: "/search", component: search },
  { path: "/revisions", component: revisions },
  { path: "/account", component: account },
  { path: "/planning", component: planning },
  { path: "/tasks", component: sprint },
  { path: "/todos", component: todos },
  { path: "*", component: notfound }
]

window.addEventListener("load", () => {
  new vue({
    el: "#application",
    template: "<div><home></home></div>",
    components: { home },
    store: store,
    router: new router({
      mode: "history",
      routes: routes
    })
  })
})
