import vue from "vue"
import router from "vue-router"
import signin from "components/signin"
import terms from "components/terms"
import password from "components/password"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

vue.use(router)
let routes = [
  { path: "/", component: signin },
  { path: "/terms", component: terms },
  { path: "/reset-password-form/:token", component: password }
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
