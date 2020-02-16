import vue from "vue"
import modal from "components/modal"

export default {
  data() {
    return {
      current: ""
    }
  },
  components: { modal },
  methods: {
    menu(revision) {
      vue.set(this, "current", revision)
      $("#modal-revision-menu").modal("show")
    },
    revise() {
      if (this.revisions[this.current] > 0) {
        this.$router.push({
          path: 'revise',
          query: {
            revision: this.current
          }
        })
      }
    },
    createModal() {
      let input = $("#modal-revision-create input").get(0)
      input.parentElement.classList.remove("was-validated")
      $("#modal-revision-create").one("shown.bs.modal", () => {
        input.value = ""
        input.focus()
      })
      $("#modal-revision-create").modal("show")
    },
    create() {
      let input = $("#modal-revision-create input").get(0)
      input.parentElement.classList.add("was-validated")
      if (input.checkValidity()) {
        this.$call("CreateRevision", { "Revision": input.value })
        $("#modal-revision-create").modal("hide")
      }
    },
    renameModal() {
      let input = $("#modal-revision-rename input").get(0)
      input.parentElement.classList.remove("was-validated")
      $("#modal-revision-rename").one("shown.bs.modal", () => {
        input.focus()
        input.select()
      })
      $("#modal-revision-rename").modal("show")
    },
    rename() {
      let input = $("#modal-revision-rename input").get(0)
      input.parentElement.classList.add("was-validated")
      if (input.checkValidity()) {
        if (this.current != input.value) {
          this.$call("RenameRevision", {
            "From": this.current,
            "To": input.value
          })
        }
        $("#modal-revision-rename").modal("hide")
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
