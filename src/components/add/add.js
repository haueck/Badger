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
  mounted() {
    this.pick = $(this.$el).children(".tag-pick")
    this.create = $(this.$el).children(".tag-create")
    this.field = this.create.find("input").get(0)
    this.field.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.field.blur()
        this.createTag()
      }
    })
  },
  methods: {
    showTags() {
      this.setParent("€")
      this.pick.modal()
    },
    showCreate() {
      this.create.modal()
      this.field.focus()
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
    },
    createTag() {
      if (this.field.checkValidity()) {
        this.create.modal("hide")
        this.$call("CreateTag", { "Tag": this.field.value, "Parent": this.tag }, () => {
          console.log("Tag created")
        })
      }
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags
    },
    path() {
      let current = this.tag
      let path = [ "/" ]
      while (current != "€") {
        path.unshift(current)
        path.unshift("/")
        current = this.$store.getters.tags[current]["Parent"]
      }
      return path.join(" ")
    }
  }
}
