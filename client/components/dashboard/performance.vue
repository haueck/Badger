<template>
  <div class="card">
    <div class="card-header">
      Daily performance
    </div>
    <div class="card-body">
      <canvas height="300"></canvas>
    </div>
  </div>
</template>
<script>
  import {Chart, LinearScale, CategoryScale, BarController, Rectangle} from "chart.js"
  export default {
    mounted() {
      let options = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 25
            }
          }
        }
      }
      let data = {
        labels: ["Today", "Yesterday", "2 days ago", "3 days ago", "4 days ago", "5 days ago", "6 days ago"],
        datasets: [{
          backgroundColor: "rgba(186, 199, 167, 0.7)",
          data: [ this.$store.getters.user("TodaysProgress"), ...this.$store.getters.user("Performance") ]
        }]
      }
      Chart.register(LinearScale, CategoryScale, BarController, Rectangle);
      this.chart = new Chart($(this.$el).find("canvas"), {
        type: "bar",
        data: data,
        options: options
      })
    }
  }
</script>
