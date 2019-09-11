import tree from "./tree.vue"
import modal from "components/modal"

export default {
  data() {
    return {
      inactive: false,
      current: "€",
      count: 0
    }
  },
  components: { tree, modal },
  mounted() {
    this.$bus.$on("show-modal", this.show)
    this.field = $("#modal-tag-rename input").get(0)
    this.field.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.renameTag(this.current)
      }
    })
  },
  methods: {
    show(tag, inactive) {
      this.inactive = inactive
      this.current = tag
      $("#modal-tag-menu").modal("show")
    },
    removeTag(tag) {
      this.$call("RemoveTag", { "Tag": tag })
      this.current = "€"
    },
    confirmRemove(tag) {
      if (this.$store.getters.tags[tag]["Children"].length > 0) {
        this.$toast("Error", "Can't remove a tag with sub-tags")
        return
      }
      this.count = this.$store.getters.tags[tag]["Count"]
      if (this.count > 1) {
        $("#modal-tag-remove").modal("show")
      }
      else {
        this.removeTag(tag)
      }
    },
    renameModal() {
      $("#modal-tag-rename").one("shown.bs.modal", () => {
        this.field.focus()
        this.field.select()
      })
      $("#modal-tag-rename").modal("show")
    },
    renameTag(from) {
      if (this.field.checkValidity()) {
        if (from != this.field.value) {
          this.$call("RenameTag", {
            "From": from,
            "To": this.field.value,
            "Parent": this.$store.getters.tags[from]["Parent"]
          })
          this.current = "€"
        }
        $("#modal-tag-rename").modal("hide")
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
