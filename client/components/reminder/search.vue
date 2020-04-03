<template>
  <div>
    <div v-html="card['Reminder']"></div>
  </div>
</template>
<script>
  import prismjs from "components/prismjs"
  export default {
    props: [ "card" ],
    mixins: [ prismjs ],
    mounted() {
      this.highlight(this.$el)
    }
  }
</script>
