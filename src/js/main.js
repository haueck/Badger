import vue from "vue"
import store from "store"
import questionInsert from "components/question/insert.vue"
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

window.addEventListener("load", () => {
  new vue({
    el: "#application",
    store: store,
    components: { questionInsert },
    data() {
      return {
          ws: Object
      }
    },
    mounted() {
        this.ws = new WebSocket('ws://' + location.host)
        this.ws.onopen = (event) => {
            this.ws.send('{ "Message": "GetCard", "CardId": "lAwt435hlP5X69qxqHDW" }');
        }
        this.ws.onmessage = (event) => {
         console.log(event.data);
        }
      console.log("Mounted")
    },
    methods: {},
    destroyed() {
      this.ws.close()
    }
  })
})
