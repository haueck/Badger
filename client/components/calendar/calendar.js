import modal from "components/modal"

export default {
  data() {
    return {
      calendar: [],
      year: 1970,
      month: 0
    }
  },
  components: { modal },
  created() {
    let now = new Date()
    this.month = now.getMonth()
    this.year = now.getFullYear()
    this.initialize()
  },
  methods: {
    initialize() {
      this.calendar.splice(0, this.calendar.length)
      let now = new Date()
      let date = new Date(this.year, this.month, 1)
      date.setDate(date.getDate() - (date.getDay() + 6) % 7)
      for (let week = 0; week < 6; ++week) {
        this.calendar.push([])
        for (let day = 0; day < 7; ++day) {
          this.calendar[week].push({
            dom: date.getDate(),
            current: date.getMonth() == this.month,
            today: this.today(date, now),
            weekend: date.getDay() == 0 || date.getDay() == 6,
            month: date.getMonth(),
            year: date.getFullYear(),
            past: date < now
          })
          date.setDate(date.getDate() + 1)
        }
      }
    },
    previous() {
      this.month--
      if (this.month == -1) {
        this.month = 11
        this.year--
      }
      this.initialize()
    },
    next() {
      this.month++
      if (this.month == 12) {
        this.month = 0
        this.year++
      }
      this.initialize()
    },
    today(date, now) {
      let year = date.getFullYear() == now.getFullYear()
      let month = date.getMonth() == now.getMonth()
      let day = date.getDate() == now.getDate()
      return year && month && day
    },
    selected(past, day, month, year) {
      if (!past) {
        day = String(day).padStart(2, "0")
        month = String(month + 1).padStart(2, "0")
        this.$bus.$emit("Calendar.Selected", `${year}-${month}-${day}`)
      }
    }
  },
  computed: {
    monthName() {
      return [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ][this.month]
    }
  }
}
