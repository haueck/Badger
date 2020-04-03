import modal from "components/modal"
import vue from "vue"

export default {
  data() {
    return {
      current: "",
      updated: ""
    }
  },
  components: { modal },
  methods: {
    menu(revision) {
      vue.set(this, "current", revision)
      vue.set(this, "updated", revision)
      $("#modal-revision-menu").modal("show")
    },
    revise() {
      if (this.revisions[this.current] > 0) {
        this.$router.push({
          path: "revise",
          query: {
            revision: this.current
          }
        })
      }
    },
    createModal() {
      let modal = $("#modal-revision-create")
      let input = modal.find("input").get(0)
      modal.removeClass("was-validated")
      modal.one("shown.bs.modal", () => {
        input.value = ""
        input.focus()
      })
      modal.modal("show")
    },
    create() {
      let modal = $("#modal-revision-create")
      let input = modal.find("input").get(0)
      modal.addClass("was-validated")
      if (input.checkValidity()) {
        this.$call("CreateRevision", { "Revision": input.value })
        $("#modal-revision-create").modal("hide")
      }
    },
    renameModal() {
      let modal = $("#modal-revision-rename")
      let input = modal.find("input").get(0)
      modal.removeClass("was-validated")
      modal.one("shown.bs.modal", () => {
        input.focus()
        input.select()
      })
      modal.modal("show")
    },
    rename() {
      let modal = $("#modal-revision-rename")
      let input = modal.find("input").get(0)
      modal.addClass("was-validated")
      if (input.checkValidity()) {
        if (this.current != this.updated) {
          this.$call("RenameRevision", {
            "From": this.current,
            "To": this.updated
          })
        }
        modal.modal("hide")
      }
    },
    remove() {
      this.$call("RemoveRevision", { "Revision": this.current })
    }
  },
  computed: {
    revisions() {
      return this.$store.getters.user("Revisions")
    },
    sorted() {
      return Object.keys(this.$store.getters.user("Revisions")).sort()
    }
  }
}
