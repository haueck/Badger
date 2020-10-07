<template>
  <div class="card">
    <div class="card-header">
      The most popular tags
    </div>
    <div class="card-body">
      <div v-if="empty" class="text-center">Nothing to see here</div>
      <canvas v-else style="max-height: 300px"></canvas>
    </div>
  </div>
</template>
<script>
  import {Chart, PieController, Arc, Legend} from "chart.js"
  import vue from "vue"
  export default {
    data() {
      return { empty: false }
    },
    mounted() {
      let tags = this.$store.getters.user("Tags")
      let top = []
      for (let tag in tags) {
        if (tags[tag]["Parent"] == "€") {
          top.push([ tag, tags[tag]["Count"] ])
        }
      }
      top.sort((a, b) => b[1] - a[1])
      while (top.length > 4 || (top.length > 0 && top[top.length - 1][1] == 0)) {
        top.pop()
      }
      if (top.length > 0) {
        let data = {
          labels: top.map(tag => tag[0]),
          datasets: [{
            data: top.map(tag => tag[1]),
            backgroundColor: [ "#698474", "#889e81", "#bac7a7", "#e5e4cc" ]
          }]
        }
        Chart.register(PieController, Arc, Legend);
        this.chart = new Chart($(this.$el).find("canvas"), {
          type: "pie",
          data: data,
          options: {}
        })
      }
      else {
        vue.set(this, "empty", true)
      }
    }
  }
</script>
