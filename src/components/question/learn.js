import vue from "vue"
import alternatives from 'alternatives'

export default {
  data () {
    return {
      answers: []
    }
  },
  mixins: [ alternatives ],
  props: [ 'card' ],
  components: { },
  mounted () {
    vue.set(this, "answers", new Array(this.card["Answers"].length))
  },
  methods: {
    verify() {
      for (let i = 0; i < this.answers.length; i++) {
        let expected = this.alternatives(this.card["Answers"][i]["Value"])
        let supplied = this.alternatives(this.answers[i])
        console.log(expected)
        console.log(supplied)
      }
    }
  }
}
