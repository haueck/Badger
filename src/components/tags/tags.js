import vue from "vue"
import tree from "./tree.vue"

export default {
  data() {
    return {
      active: "€",
      count: 0
    }
  },
  components: { tree },
  mounted() {
    this.$bus.$on("show-modal", tag => this.show(tag))
    this.menu = $(this.$el).children(".tag-menu")
    this.rename = $(this.$el).children(".tag-rename")
    this.remove = $(this.$el).children(".tag-remove")
    this.field = this.rename.find("input").get(0)
    this.field.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.renameTag(this.active)
        this.rename.modal("hide")
      }
    })
  },
  methods: {
    show(tag) {
      this.active = tag
      this.menu.modal()
    },
    removeTag(tag) {
      this.$call("RemoveTag", { "Tag": tag })
    },
    confirmRemove(tag) {
      if (this.$store.getters.tags[tag]["Children"].length > 0) {
        this.$toast("Error", "Can't remove a tag with sub-tags")
        return
      }
      this.count = this.$store.getters.tags[tag]["Count"]
      if (this.count > 1) {
        this.remove.modal()
      }
      else {
        this.removeTag(tag)
      }
    },
    renameModal() {
      this.rename.one("shown.bs.modal", () => {
        this.field.focus()
        this.field.select()
      })
      this.rename.modal()
    },
    renameTag(from) {
      if (this.field.checkValidity()) {
        if (from != this.field.value) {
          this.$call("RenameTag", { "From": from, "To": this.field.value })
        }
      }
    },
    enableCards(tag) {
      this.$call("EnableCards", { "Tag": tag })
    },
    disableCards(tag) {
      this.$call("DisableCards", { "Tag": tag })
    },
    toggleInactive(tag) {
      if (this.$store.getters.tags[tag]["Inactive"]) {
        this.$call("ActivateTag", { "Tag": tag })
      }
      else {
        this.$call("DeactivateTag", { "Tag": tag })
      }
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags
    }
  }
}
