import modal from "components/modal"
import vue from "vue"

export default {
  data() {
    return {
      id: "",
      name: "",
      description: ""
    }
  },
  components: { modal },
  methods: {
    modal(tid) {
      this.id = tid
      this.$store.getters.user("Sprint").forEach(task => {
        if (task["TaskId"] == tid) {
          this.name = task["Name"]
          this.description = task["Description"]
        }
      })
      let modal = $("#modal-task-sprint-edit")
      modal.removeClass("was-validated")
      modal.modal("show")
      modal.find("input").focus()
    },
    editTask(event) {
      event.preventDefault()
      event.stopPropagation()
      let modal = $("#modal-task-sprint-edit")
      modal.addClass("was-validated")
      if (modal.find("input").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        this.updateTask(this.id, {
          "Description": this.description,
          "Name": this.name
        })
        modal.modal("hide")
      }
    },
    updateTask(tid, data) {
      let fields = Object.keys(data)
      this.$store.getters.user("Sprint").forEach(task => {
        if (task["TaskId"] == tid) {
          data["TaskId"] = tid
          data["ProjectId"] = task["ProjectId"]
          this.$call("UpdateTasks", { "Tasks": [ data ] }, () => {
            for (let field of fields) {
              task[field] = data[field]
            }
          })
        }
      })
    },
    start(tid) {
      this.updateTask(tid, { "Status": "Started" })
    },
    done(tid) {
      this.updateTask(tid, { "Status": "Finished" })
    },
    cancel(tid) {
      this.updateTask(tid, { "Status": "Ready" })
    }
  },
  computed: {
    empty() {
      return this.$store.getters.user("Sprint").length == 0
    },
    ready() {
      return this.$store.getters.user("Sprint").filter(task => task["Status"] == "Ready")
    },
    started() {
      return this.$store.getters.user("Sprint").filter(task => task["Status"] == "Started")
    },
    finished() {
      return this.$store.getters.user("Sprint").filter(task => task["Status"] == "Finished")
    }
  }
}
