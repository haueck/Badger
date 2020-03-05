<template>
  <div class="task border mb-2">
    <div class="p-3">
      <span class="name" :style="{ 'text-decoration': task['Status'] == 'Archived' ? 'line-through' : 'none' }" @click="$bus.$emit('EditTask', task['TaskId'])">{{ task['Name'] }}</span>
    </div>
    <div class="bar p-1" :style="{ 'background-color': task['Color'] }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: [ 'task' ]
  }
</script>
<style scoped>
  .bar {
    display: flex;
    justify-content: flex-end;
  }
  .name {
    cursor: pointer;
  }
  .name:hover {
    text-decoration: underline;
  }
  button {
    background-color: white;
    color: grey;
    border: none;
    width: 50px;
    height: 25px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12pt;
    margin-left: 0.25rem;
  }
  button:hover {
    background-color: #e2e6ea;
  }
</style>
