import question from "components/question/add.vue"
import english from "components/english/add.vue"

export default {
  data() {
    return {
      selected: "None",
      tag: "€",
      card: {
        "Type": "None",
        "Tags": [],
        "Learn": true
      }
    }
  },
  components: { question, english },
  methods: {
    showTags() {
      this.setParent("€")
      $(this.$el).children(".modal").modal()
    },
    setParent(tag) {
      this.tag = tag
    },
    back() {
      this.tag = this.$store.getters.tags[this.tag]["Parent"]
    },
    addTags(tag) {
      if (tag == "€") {
        return
      }
      if (this.card["Tags"].includes(tag)) {
        return
      }
      this.card["Tags"].push(tag)
      this.addTags(this.$store.getters.tags[tag]["Parent"])
    },
    removeTag(tag) {
      let index = this.card["Tags"].indexOf(tag)
      if (index > -1) {
        this.card["Tags"].splice(index, 1)
      }
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags
    }
  }
}
