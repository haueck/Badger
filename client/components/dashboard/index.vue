<template>
  <div class="row">
    <div class="col">
      <todos></todos>
      <tasks></tasks>
    </div>
    <div class="col">
      <performance></performance>
      <pie></pie>
    </div>
  </div>
</template>
<script>
  import performance from "./performance.vue"
  import tasks from "./tasks.vue"
  import todos from "./todos.vue"
  import pie from "./pie.vue"
  export default {
    components: { performance, todos, pie, tasks }
  }
</script>
<style scoped>
  .col {
    padding: 0 10px;
  }
  .col > * {
    margin-bottom: 20px;
  }
  /deep/ .card-header {
    padding: 0 15px;
    height: 50px;
    display: flex;
    align-items: center;
  }
</style>
