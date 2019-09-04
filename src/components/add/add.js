import question from "components/question/add.vue"
import english from "components/english/add.vue"
import modal from "components/modal"

export default {
  data() {
    return {
      selected: "None",
      modals: {},
      tag: "€",
      card: {
        "Type": "None",
        "Tags": [],
        "Learn": true
      },
    }
  },
  components: { question, english, modal },
  mounted() {
    //this.modals.tag = $(this.$el).children("#modal-add-tag")
    this.create = $(this.$el).children(".tag-create")
    this.parent = $(this.$el).children(".parent-pick")
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
    switchModals(hide, show) {
      hide.modal("hide")
      show.modal("show")
    },
    changeParent() {
      this.setParent("€")
      this.switchModals(this.create, this.parent)
    },
    selectParent(tag) {
      this.setParent(tag)
      this.switchModals(this.parent, this.create)
    },
    showTags() {
      this.setParent("€")
      this.pick.modal()
    },
    showCreate() {
      this.create.modal()
      this.field.focus()
      this.field.value = ""
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
        let name = this.field.value
        let parent = this.tag
        this.$call("CreateTag", { "Tag": name, "Parent": parent }, () => {
          this.card["Tags"].push(name)
          this.addTags(parent)
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
