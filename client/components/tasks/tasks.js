import modal from "components/modal"
import task from "components/task"
import vue from "vue"

export default {
  data() {
    return {
      initialized: false,
      tasks: [],
      forms: {
        id: "",
        name: "",
        description: ""
      }
    }
  },
  components: { modal, task },
  created() {
    this.$bus.$on("EditTask", tid => this.editTaskModal(tid))
    this.$bus.$on("Tasks", response => {
      response["Data"].forEach(project => {
        project["Tasks"].forEach(task => {
          if (task["Status"] == "Ready" || task["Status"] == "Started" || task["Status"] == "Finished") {
            task["ProjectId"] = project["ProjectId"]
            task["Color"] = project["Color"]
            this.tasks.push(task)
          }
        })
      })
      this.sort()
      vue.set(this, "initialized", true)
    })
    this.$call("GetActiveTasks", {})
  },
  methods: {
    editTaskModal(tid) {
      this.forms.id = tid
      this.tasks.forEach(task => {
        if (task["TaskId"] == tid) {
          this.forms.name = task["Name"]
          this.forms.description = task["Description"]
        }
      })
      let modal = $("#modal-task-edit")
      modal.removeClass("was-validated")
      modal.modal("show")
    },
    editTask() {
      let modal = $("#modal-task-edit")
      modal.addClass("was-validated")
      if (modal.find("input").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        this.updateTask(this.forms.id, {
          "Description": this.forms.description,
          "Name": this.forms.name
        })
        modal.modal("hide")
      }
    },
    updateTask(tid, data) {
      let fields = Object.keys(data)
      this.tasks.forEach(task => {
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
    },
    undo(tid) {
      this.updateTask(tid, { "Status": "Started" })
    },
    sort() {
      this.tasks.sort((a, b) => Number(a["Priority"]) - Number(b["Priority"]))
    }
  }
}
