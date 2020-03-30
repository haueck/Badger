<template>
  <div>
    <modal :title="'Edit the task'" id="modal-task-dashboard-edit">
      <form @submit="editTask($event)" novalidate class="p-4">
        <div class="form-group mb-3">
          <div>Task name</div>
          <input type="text" v-model="name" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <div>Description</div>
          <textarea v-model="description" class="form-control" rows="6"></textarea>
        </div>
      </form>
      <template v-slot:footer>
        <button type="button" class="btn btn-primary" @click="editTask($event)">Save</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </template>
    </modal>
    <div class="card">
      <div class="card-header">
        Tasks
      </div>
      <div v-if="tasks.length == 0" class="card-body text-center">Nothing to see here</div>
      <div v-else class="list-group list-group-flush">
        <div v-for="task in tasks" class="list-group-item task">
          <div @click="finished(task['TaskId'], $event.target)" class="circle" :style="{ color: task['Color'] }">
            <i class="far fa-circle"></i>
            <i class="far fa-check-circle"></i>
            <i class="fas fa-check-circle"></i>
          </div>
          <div @click="modal(task['TaskId'])">{{ task['Name'] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import modal from "components/modal"
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
        let modal = $("#modal-task-dashboard-edit")
        modal.removeClass("was-validated")
        modal.modal("show")
        modal.find("input").focus()
      },
      editTask(event) {
        event.preventDefault()
        event.stopPropagation()
        let modal = $("#modal-task-dashboard-edit")
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
      updateTask(tid, data, callback) {
        let fields = Object.keys(data)
        this.tasks.forEach(task => {
          if (task["TaskId"] == tid) {
            data["TaskId"] = tid
            data["ProjectId"] = task["ProjectId"]
            this.$call("UpdateTasks", { "Tasks": [ data ] }, () => {
              for (let field of fields) {
                task[field] = data[field]
              }
              if (callback) {
                callback()
              }
            })
          }
        })
      },
      finished(tid, element) {
        let circle = $(element).closest(".circle")
        circle.addClass("finished")
        this.updateTask(tid, { "Status": "Finished" }, () => {
          circle.removeClass("finished")
        })
      }
    },
    computed: {
      tasks() {
        return this.$store.getters.user("Sprint").filter(task => task["Status"] == "Started")
      }
    }
  }
</script>
<style scoped>
  .list-group-item {
    padding: 0;
    display: flex;
    align-items: center;
  }
  .task > div {
    cursor: pointer;
  }
  .task div:last-child:hover {
    text-decoration: underline;
  }
  .circle {
    padding: 17px;
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
