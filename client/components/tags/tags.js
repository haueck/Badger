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
  },
  methods: {
    show(tag, inactive) {
      this.inactive = inactive
      this.current = tag
      $("#modal-tag-menu").modal("show")
    },
    showCards(tag) {
      this.$router.push({
        path: "search",
        query: {
          query: "tag:\"" + tag + "\""
        }
      })
    },
    revisionsModal() {
      $("#modal-tag-revision").modal("show")
    },
    addToRevision(tag) {
      let revision = $("#select-revision option:selected").text()
      this.$call("AddTagToRevision", {
        "Tag": tag,
        "Revision": revision
      })
      $("#modal-tag-revision").modal("hide")
    },
    removeTag(tag) {
      this.$call("RemoveTag", { "Tag": tag })
      this.current = "€"
    },
    confirmRemove(tag) {
      if (this.$store.getters.user("Tags")[tag]["Children"].length > 0) {
        this.$toast("Error", "Can't remove a tag with sub-tags")
        return
      }
      this.count = this.$store.getters.user("Tags")[tag]["Count"]
      if (this.count > 1) {
        $("#modal-tag-remove").modal("show")
      }
      else {
        this.removeTag(tag)
      }
    },
    renameModal() {
      let input = $("#modal-tag-rename input").get(0)
      input.parentElement.classList.remove("was-validated")
      $("#modal-tag-rename").one("shown.bs.modal", () => {
        input.focus()
        input.select()
      })
      $("#modal-tag-rename").modal("show")
    },
    renameTag(from) {
      let input = $("#modal-tag-rename input").get(0)
      input.parentElement.classList.add("was-validated")
      if (input.checkValidity()) {
        if (from != input.value) {
          this.$call("RenameTag", {
            "From": from,
            "To": input.value,
            "Parent": this.$store.getters.user("Tags")[from]["Parent"]
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
      if (this.$store.getters.user("Tags")[tag]["Inactive"]) {
        this.$call("ActivateTag", { "Tag": tag })
      }
      else {
        this.$call("DeactivateTag", { "Tag": tag })
      }
    }
  },
  computed: {
    revisions() {
      return Object.keys(this.$store.getters.user("Revisions")).sort()
    },
    tags() {
      return this.$store.getters.user("Tags")
    }
  },
  destroyed() {
    this.$bus.$off("show-modal")
  }
}
