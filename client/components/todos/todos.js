import calendar from "components/calendar"
import modal from "components/modal"
import vue from "vue"

export default {
  data() {
    return {
      todo: {
        id: "",
        text: ""
      },
      todos: [],
      populated: false
    }
  },
  components: { modal, calendar },
  mounted() {
    this.$bus.$on("Calendar.Selected", this.reschedule)
    this.$bus.$on("Todos", this.populate)
    this.$call("GetTodos", {})
  },
  methods: {
    populate(msg) {
      this.todos.splice(0, this.todos.length)
      msg["Todos"].forEach(todo => {
        if ("object" == typeof todo["Date"]) {
          todo["Date"] = new Date(todo["Date"]._seconds * 1000).toISOString()
        }
        this.todos.push(todo)
      })
      this.todos.sort((a, b) => {
        if (a["Date"] < b["Date"]) {
          return -1
        }
        else if (a["Date"] > b["Date"]) {
          return 1
        }
        else {
          return 0
        }
      })
      vue.set(this, "populated", true)
    },
    editModal(todo) {
      this.todo.id = todo["TodoId"]
      vue.set(this.todo, "text", todo["Text"])
      let modal = $("#modal-todo-edit")
      modal.removeClass("was-validated")
      modal.modal("show")
      modal.find("textarea").focus()
    },
    dateModal(tid) {
      this.todo.id = tid
      $("#modal-todo-edit-date").modal("show")
    },
    update() {
      let modal = $("#modal-todo-edit")
      modal.addClass("was-validated")
      if (modal.find("textarea").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        this.$call("UpdateTodo", {
          "Todo": this.todo.text,
          "TodoId": this.todo.id
        }, () => { this.$call("GetUserData", {}) })
        modal.modal("hide")
      }
    },
    remove() {
      $("#modal-todo-edit").modal("hide")
      this.$call("RemoveTodo", { "TodoId": this.todo.id }, () => { this.$call("GetUserData", {}) })
    },
    reschedule(date) {
      $("#modal-todo-edit-date").modal("hide")
      this.$call("RescheduleTodo", { "TodoId": this.todo.id, "Date": date })
    }
  },
  computed: {
    started() {
      return this.todos.filter(todo => todo["Status"] == "Started")
    },
    scheduled() {
      return this.todos.filter(todo => todo["Status"] == "Scheduled")
    },
    finished() {
      return this.todos.filter(todo => todo["Status"] == "Finished")
    }
  },
  destroyed() {
    this.$bus.$off("Todos", this.initialize)
    this.$bus.$off("Calendar.Selected", this.reschedule)
  }
}
