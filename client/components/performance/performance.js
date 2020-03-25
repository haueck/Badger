import Chart from 'chart.js';

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
      labels : ["Today", "Yesterday", "2 days ago", "3 days ago", "4 days ago", "5 days ago", "6 days ago"],
      datasets : [{
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        data: [ this.$store.getters.user("TodaysProgress"), ...this.$store.getters.user("Performance") ]
      }]
    }
    this.chart = new Chart($(this.$el).find("canvas"), {
      type: 'bar',
      data: data,
      options: options
    })
  }
}
