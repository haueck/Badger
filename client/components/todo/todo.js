import calendar from "components/calendar"
import modal from "components/modal"
import vue from "vue"

export default {
  data() {
    return {
      todo: ""
    }
  },
  components: { modal, calendar },
  mounted() {
    this.$bus.$on("Calendar.Selected", this.schedule)
  },
  methods: {
    createModal(todo) {
      vue.set(this, "todo", todo)
      let modal = $("#modal-todo-add")
      modal.removeClass("was-validated")
      modal.modal("show")
      modal.find("textarea").focus()
    },
    scheduleModal() {
      let modal = $("#modal-todo-add")
      modal.addClass("was-validated")
      if (modal.find("textarea").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        modal.modal("hide")
        let calendar = $("#modal-todo-calendar")
        calendar.modal("show")
        calendar.on("hidden.bs.modal", this.cancel)
      }
    },
    create() {
      let modal = $("#modal-todo-add")
      modal.addClass("was-validated")
      if (modal.find("textarea").get(0).checkValidity()) {
        modal.removeClass("was-validated")
        this.$call("CreateTodo", { "Todo": this.todo })
        modal.modal("hide")
      }
    },
    schedule(date) {
      let modal = $("#modal-todo-calendar")
      modal.off("hidden.bs.modal", this.cancel)
      modal.modal("hide")
      this.$call("ScheduleTodo", { "Todo": this.todo, "Date": date })
    },
    cancel() {
      this.createModal(this.todo)
    },
    finished(tid, circle) {
      circle.classList.remove("fa-circle")
      circle.classList.add("fa-check-circle")
      this.$call("FinishedTodo", { "Todo": tid }, () => {
        circle.classList.remove("fa-check-circle")
        circle.classList.add("fa-circle")
      })
    },
  },
  computed: {
    todos() {
      return this.$store.getters.user("Todos")
    }
  },
  destoyed() {
    this.$bus.$off("Calendar.Selected", this.schedule)
  }
}
