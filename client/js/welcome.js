import vue from "vue"
import router from "vue-router"
import signin from "components/signin"
import terms from "components/terms"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "css/main.css"
import "css/large.css"
import "css/small.css"

vue.use(router)
let routes = [
  { path: "/", component: signin },
  { path: "/terms", component: terms }
]

window.addEventListener("load", () => {
  new vue({
    el: "#application",
    router: new router({
      mode: "history",
      routes: routes
    }),
    data() {
      return {}
    }
  })
})
