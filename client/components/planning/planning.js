import draggable from "vuedraggable"
import modal from "components/modal"
import vue from "vue"

export default {
  data() {
    return {
      full: false,
      pending: false,
      finished: false,
      archived: false,
      populated: false,
      projects: [],
      forms: {
        project: {},
        task: {}
      }
    }
  },
  components: { modal, draggable },
  created() {
    this.init()
    this.$bus.$on("Tasks", this.populate)
    this.$call("GetActiveTasks", {})
  },
  methods: {
    populate(tasks) {
      tasks["Data"].forEach(project => this.projects.push(project))
      this.prepare()
      vue.set(this, "populated", true)
    },
    init() {
      vue.set(this.forms.project, "id", "")
      vue.set(this.forms.project, "name", "")
      vue.set(this.forms.project, "active", false)
      vue.set(this.forms.project, "priority", "2")
      vue.set(this.forms.project, "status", "Active")
      vue.set(this.forms.project, "color", "#0080c0")
      vue.set(this.forms.task, "id", "")
      vue.set(this.forms.task, "name", "")
      vue.set(this.forms.task, "description", "")
      vue.set(this.forms.task, "status", "Pending")
    },
    prepare() {
      this.projects.sort((a, b) => { return a["Priority"] == b["Priority"] ? (a["Name"] < b["Name"] ? -1 : 1) : b["Priority"] - a["Priority"] })
      this.projects.forEach(project => {
        if ("Sorted" in project) {
          project["Sorted"].splice(0, project["Sorted"].length)
        }
        else {
          vue.set(project, "Sorted", [])
        }
        project["Tasks"].forEach(task => {
          if (task["Status"] == "Pending") {
            vue.set(this, "pending", true)
          }
          else if (task["Status"] == "Finished") {
            vue.set(this, "finished", true)
          }
          else if (task["Status"] == "Archived") {
            vue.set(this, "archived", true)
          }
          if (task['Status'] == "Pending" || (this.full && task['Status'] == "Archived")) {
            project["Sorted"].push(task)
          }
        })
        project["Sorted"].sort((a, b) => { return a["Name"] < b["Name"] ? -1 : 1 })
      })
    },
    createProjectModal() {
      this.init()
      let modal = $("#modal-project-create")
      modal.removeClass("was-validated")
      modal.one("shown.bs.modal", () => modal.find("input[type='text']").focus())
      modal.modal("show")
    },
    createTaskModal(project) {
      this.init()
      this.forms.project.id = project
      let modal = $("#modal-task-create")
      modal.removeClass("was-validated")
      modal.one("shown.bs.modal", () => modal.find("input").focus())
      modal.modal("show")
    },
    editProjectModal(pid) {
      this.init()
      this.forms.project.id = pid
      this.projects.forEach(project => {
        if (project["ProjectId"] == pid) {
          this.forms.project.name = project["Name"]
          this.forms.project.status = project["Status"]
          this.forms.project.priority = project["Priority"]
          this.forms.project.color = project["Color"]
          project["Tasks"].forEach(task => {
            if ([ "Ready", "Started", "Finished" ].includes(task["Status"])) {
              this.forms.project.active = true
            }
          })
        }
      })
      let modal = $("#modal-project-edit")
      modal.removeClass("was-validated")
      modal.modal("show")
    },
    editTaskModal(tid) {
      this.init()
      this.forms.task.id = tid
      this.projects.forEach(project => {
        project["Tasks"].forEach(task => {
          if (task["TaskId"] == tid) {
            this.forms.task.name = task["Name"]
            this.forms.task.description = task["Description"]
          }
        })
      })
      let modal = $("#modal-task-edit")
      modal.removeClass("was-validated")
      modal.modal("show")
    },
    createProject(event) {
      console.log("WTF")
      event.preventDefault()
      event.stopPropagation()
      let modal = $("#modal-project-create")
      modal.addClass("was-validated")
      if (modal.find("input[type='text']").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        let project = {
          "Status": "Active",
          "Name": this.forms.project.name,
          "Color": this.forms.project.color,
          "Priority": Number(this.forms.project.priority)
        }
        this.$call("CreateProject", project, msg => {
          project["ProjectId"] = msg["ProjectId"]
          project["Tasks"] = []
          this.projects.push(project)
          this.$store.commit("updateProjects", 1)
          this.prepare()
        })
        modal.modal("hide")
      }
    },
    createTask(event) {
      event.preventDefault()
      event.stopPropagation()
      let modal = $("#modal-task-create")
      modal.addClass("was-validated")
      if (modal.find("input").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        let task = {
          "Status": "Pending",
          "Name": this.forms.task.name,
          "ProjectId": this.forms.project.id,
          "Description": this.forms.task.description
        }
        this.$call("CreateTask", task, msg => {
          task["TaskId"] = msg["TaskId"]
          this.projects.forEach(project => {
            if (project["ProjectId"] == task["ProjectId"]) {
              task["Color"] = project["Color"]
              project["Tasks"].push(task)
            }
          })
          vue.set(this, "pending", true)
          this.prepare()
        })
        modal.modal("hide")
      }
    },
    updateProject(event) {
      event.preventDefault()
      event.stopPropagation()
      let modal = $("#modal-project-edit")
      modal.addClass("was-validated")
      if (modal.find("input[type='text']").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        let update = {
          "ProjectId": this.forms.project.id,
          "Name": this.forms.project.name,
          "Priority": Number(this.forms.project.priority),
          "Color": this.forms.project.color,
          "Status": this.forms.project.status
        }
        this.$call("UpdateProject", update, msg => {
          this.projects.forEach(project => {
            if (project["ProjectId"] == update["ProjectId"]) {
              for (let field in update) {
                vue.set(project, field, update[field])
              }
            }
          })
          this.prepare()
        })
        modal.modal("hide")
      }
    },
    editTask(event) {
      event.preventDefault()
      event.stopPropagation()
      let modal = $("#modal-task-edit")
      modal.addClass("was-validated")
      if (modal.find("input").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        let update = {
          "Description": this.forms.task.description,
          "TaskId": this.forms.task.id,
          "Name": this.forms.task.name
        }
        this.updateTask(update)
        modal.modal("hide")
      }
    },
    removeProject() {
      this.$call("RemoveProject", { "ProjectId": this.forms.project.id }, msg => {
        for (let i = 0; i < this.projects.length; ++i) {
          if (this.projects[i]["ProjectId"] == this.forms.project.id) {
            this.projects.splice(i, 1)
            this.$store.commit("updateProjects", -1)
            break
          }
        }
      })
      $("#modal-project-edit").modal("hide")
    },
    removeTask() {
      this.projects.forEach(project => {
        for (let i = 0; i < project["Tasks"].length; ++i) {
          if (project["Tasks"][i]["TaskId"] == this.forms.task.id) {
            let update = {
              "ProjectId": project["ProjectId"],
              "TaskId": this.forms.task.id
            }
            this.$call("RemoveTask", update, () => {
              project["Tasks"].splice(i, 1)
              this.prepare()
            })
            break
          }
        }
      })
      $("#modal-task-edit").modal("hide")
    },
    updateTask(update, callback) {
      this.updateTasks([ update ], callback)
    },
    updateTasks(updates, callback) {
      updates.forEach(update => {
        this.projects.forEach(project => {
          project["Tasks"].forEach(task => {
            if (task["TaskId"] == update["TaskId"]) {
              update["ProjectId"] = project["ProjectId"]
            }
          })
        })
      })
      this.$call("UpdateTasks", { "Tasks": updates }, () => {
        updates.forEach(update => {
          this.projects.forEach(project => {
            project["Tasks"].forEach(task => {
              if (task["TaskId"] == update["TaskId"]) {
                for (let field of [ "Name", "Description", "Status", "Priority" ]) {
                  if (field in update) {
                    vue.set(task, field, update[field])
                  }
                }
              }
            })
          })
        })
        this.prepare()
        if (callback) {
          callback()
        }
      })
    },
    schedule(tid) {
      this.updateTask({
        "TaskId": tid,
        "Status": "Ready",
        "Priority": this.sprint.length
      })
    },
    cancel(tid) {
      this.updateTask({
        "TaskId": tid,
        "Status": "Pending"
      }, this.updatePriority)
    },
    updatePriority() {
      let updates = []
      for (let i = 0; i < this.sprint.length; ++i) {
        if (this.sprint[i]["Priority"] != i) {
          updates.push({
            "TaskId": this.sprint[i]["TaskId"],
            "Priority": i
          })
        }
      }
      if (updates.length > 0) {
        this.updateTasks(updates)
      }
    },
    completeSprint() {
      let tasks = []
      this.sprint.forEach(task => {
        if (task["Status"] == "Finished") {
          tasks.push({
            "TaskId": task["TaskId"],
            "Status": "Archived"
          })
        }
      })
      this.updateTasks(tasks, this.updatePriority)
      vue.set(this, "archived", true)
      vue.set(this, "finished", false)
    },
    fullList() {
      this.full = true
      this.$call("GetInactiveTasks", {}, null, () => { this.full = false })
    }
  },
  computed: {
    hidden() {
      return this.$store.getters.user("Projects") != this.projects.length
    },
    sprint() {
      return this.$store.getters.user("Sprint")
    },
    sortable: {
      get() {
        return this.$store.getters.user("Sprint")
      },
      set(sprint) {
        this.$store.commit("reorderSprint", sprint)
        this.updatePriority()
      }
    }
  },
  destroyed() {
    this.$bus.$off("Tasks", this.populate)
  }
}
