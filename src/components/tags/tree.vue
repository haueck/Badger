<template>
  <div>
    <div class="tag border-top border-left border-right" :style="indent" @click="$bus.$emit('show-modal', tag)">
      <div :class="{ 'text-muted': tags[tag].Inactive }">{{ tag }}</div>
      <div class="badge badge-pill" :class="[tags[tag].Inactive ? 'badge-secondary' : 'badge-primary']">{{ tags[tag].Count }}</div>
    </div>
    <tree v-for="child in tags[tag].Children" :tags="tags" :tag="child" :depth="depth + 1"></tree>
  </div>
</template>
<script>
  export default {
    props: [ "tags", "tag", "depth" ],
    name: "tree",
    computed: {
      indent() {
        let padding = (20 * this.depth) + "px"
        return { "padding-left": padding }
      }
    }
  }
</script>
<style scoped>
  .tag {
    display: flex;
    justify-content: space-between;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 20px;
    cursor: pointer;
    align-items: center;
  }
  .tag:hover {
    background-color: #f8f9fa;
  }
</style>
