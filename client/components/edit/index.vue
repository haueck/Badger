<template>
  <add v-if="card" :editing="card" :id="$route.params.id"></add>
  <div v-else>Waiting...</div>
</template>
<script>
  import add from "components/add"
  export default {
    data() {
      return {
        card: null
      }
    },
    components: { add },
    mounted() {
      this.$bus.$on("EditCard", message => {
        this.card = message
      })
      this.$call("GetCard", { "CardId": this.$route.params.id })
    },
    destroyed() {
      this.$bus.$off("EditCard")
    }
  }
</script>
