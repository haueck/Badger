<template>
  <div class="row py-2">
    <div class="col-md-6 col-12 py-0 px-2">
      <div class="pb-2 pt-md-2">
        <todos></todos>
      </div>
      <div class="pb-2 pt-md-2">
        <tasks></tasks>
      </div>
    </div>
    <div class="col-md-6 col-12 py-0 px-2">
      <div class="pb-2 pt-md-2">
        <performance></performance>
      </div>
      <div class="pb-2 pt-md-2">
        <pie></pie>
      </div>
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
  .row {
    max-width: 1200px;
    margin: 0 auto;
  }
  /deep/ .card-header {
    padding: 0 15px;
    height: 50px;
    display: flex;
    align-items: center;
  }
</style>
