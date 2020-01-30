export default {
  data () {
    return {
      single: -1,
      multiple: []
    }
  },
  props: [ "card" ],
  created() {
    for (let i = 0; i < this.card["Answers"].length; ++i) {
      this.multiple.push(false)
    }
  },
  methods: {
    grade() {
      let pass = true
      if (this.isSingle()) {
        if (this.single >= 0) {
          pass = this.card["Answers"][this.single]["Correct"]
        }
        else {
          pass = false
        }
      }
      else {
        for (let i = 0; i < this.multiple.length; ++i) {
          if (this.multiple[i] != this.card["Answers"][i]["Correct"]) {
            pass = false
          }
        }
      }
      this.$bus.$emit("Graded", pass)
    },
    isSingle() {
      return this.card["Variation"] == "SingleResponse"
    }
  }
}
