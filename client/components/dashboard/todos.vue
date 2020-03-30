<template>
  <div>
    <modal :title="'Add to your to-do list'" id="modal-todo-add">
      <form novalidate>
        <div class="form-group p-4 mb-0">
          <textarea v-model="todo" class="form-control" rows="4" required></textarea>
        </div>
      </form>
      <template v-slot:footer>
        <button type="button" class="btn btn-primary" @click="create">Add</button>
        <button type="button" class="btn btn-primary" @click="scheduleModal">Schedule</button>
      </template>
    </modal>
    <calendar id="modal-todo-calendar"></calendar>
    <div class="card todos">
      <div class="card-header">
        <router-link to="/todos">Things to do</router-link>
        <button type="button" class="btn btn-outline-primary btn-sm ml-3" @click="createModal('')">Add</button>
      </div>
      <div v-if="todos.length == 0" class="card-body text-center">Nothing to see here</div>
      <div v-else class="list-group list-group-flush">
        <div v-for="todo in todos" class="list-group-item">
          <div @click="finished(todo['TodoId'], $event.target)" class="circle">
            <i class="far fa-circle"></i>
            <i class="far fa-check-circle"></i>
            <i class="fas fa-check-circle"></i>
          </div>
          <div>{{ todo['Text'] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      finished(tid, element) {
        let circle = $(element).closest(".circle")
        circle.addClass("finished")
        this.$call("FinishedTodo", { "Todo": tid }, () => {
          circle.removeClass("finished")
        })
      },
    },
    computed: {
      todos() {
        return this.$store.getters.user("Todos")
      }
    },
    destroyed() {
      this.$bus.$off("Calendar.Selected", this.schedule)
    }
  }
</script>
<style scoped>
  a, a:hover {
    color: black;
  }
  .todos .list-group-item {
    padding: 0;
    display: flex;
    align-items: center;
  }
  .circle {
    padding: 17px;
    cursor: pointer;
  }
  .circle i {
    display: none;
  }
  .circle.finished i.far.fa-check-circle {
    display: inline;
    color: green;
  }
  .circle:not(.finished):not(:hover) i.fa-circle {
    display: inline;
  }
  .circle:not(.finished):hover i.fas.fa-check-circle {
    display: inline;
  }
</style>
