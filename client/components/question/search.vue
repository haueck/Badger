<template>
  <div>
    <div v-html="card['Question']" class="mb-2"></div>
    <div v-for="(answer, index) in card['Answers']">
      Answer {{ index + 1 }}: {{ answer }}
    </div>
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
