import vue from "vue"

export default {
  data() {
    return {
      active: false,
      queue: []
    }
  },
  mounted() {
    this.$bus.$on("Toast", toast => {
      this.queue.push(toast)
      this.activate()
    })
  },
  methods: {
    activate() {
      if (!this.active && this.queue.length != 0) {
        this.message = this.queue[0]["Message"]
        this.level = this.queue[0]["Level"]
        if (this.level == "Error") {
          this.icon = "exclamation-circle"
          this.color = "text-danger"
        }
        else if (this.level == "Info") {
          this.icon = "info-circle"
          this.color = "text-info"
        }
        else {
          this.icon = "question-circle"
          this.color = "text-secondary"
          console.warn("Unknown log level")
        }
        this.active = true
        this.queue.shift()
        vue.nextTick(() => {
          let toast = $(this.$refs.toast)
          toast.toast("show").on("hidden.bs.toast", () => {
            toast.off()
            this.deactivate()
          })
        })
      }
    },
    deactivate() {
      this.active = false
      vue.nextTick(() => {
        this.activate()
      })
    }
  }
}
