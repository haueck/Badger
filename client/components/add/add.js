import multiplechoice from "components/multiplechoice/add.vue"
import question from "components/question/add.vue"
import reminder from "components/reminder/add.vue"
import english from "components/english/add.vue"
import xsl from "components/add/dehtmlize.xsl"
import modal from "components/modal"
import vue from "vue"

export default {
  data() {
    return {
      tag: "€",
      card: {}
    }
  },
  props: {
    editing: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: null
    }
  },
  components: { question, reminder, english, multiplechoice, modal },
  created() {
    if (this.editing) {
      vue.set(this, "card", this.editing)
    }
    else {
      this.resetCard("", [])
    }
  },
  mounted() {
    this.field = $("#modal-create-tag input").get(0)
    this.field.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.field.blur()
        this.createTag()
      }
    })
  },
  methods: {
    typeChanged(type) {
      this.resetCard(type, this.card["Tags"])
    },
    resetCard(type, tags) {
      vue.set(this, "card", {
        "Type": type,
        "Tags": tags,
        "Disabled": false
      })
    },
    finalizeCard() {
        this.$bus.$emit("FinalizeCard")
    },
    saveCard() {
      if (this.editing) {
        this.$call("UpdateCard", {
          "Card": this.card,
          "CardId": this.id
        })
      }
      else {
        let type = this.card["Type"]
        let tags = this.card["Tags"]
        this.$call("CreateCard", { "Card": this.card }, response => {
          if (response["Level"] == "Success") {
            this.resetCard("", [])
            vue.nextTick(() => {
              this.resetCard(type, tags)
            })
          }
        })
      }
    },
    confirmRemove() {
      $("#modal-card-remove").modal("show")
    },
    removeCard() {
      $("#modal-card-remove").modal("hide")
      this.$call("RemoveCard", { "CardId": this.id }, response => {
        if (response["Level"] == "Success") {
          this.$router.push("/tags")
        }
      })
    },
    switchModals(hide, show) {
      $("#" + hide).modal("hide")
      $("#" + show).modal("show")
    },
    changeParent() {
      this.setParent("€")
      this.switchModals("modal-create-tag", "modal-select-parent")
    },
    selectParent(tag) {
      this.setParent(tag)
      this.switchModals("modal-select-parent", "modal-create-tag")
    },
    showTags() {
      this.setParent("€")
      $("#modal-add-tag").modal("show")
    },
    showCreate() {
      this.switchModals("modal-add-tag", "modal-create-tag")
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
    cancelCreate() {
      this.setParent("€")
      this.switchModals("modal-create-tag", "modal-add-tag")
    },
    createTag() {
      if (this.field.checkValidity()) {
        $("#modal-create-tag").modal("hide")
        let name = this.field.value
        let parent = this.tag
        this.$call("CreateTag", { "Tag": name, "Parent": parent }, () => {
          this.card["Tags"].push(name)
          this.addTags(parent)
        })
      }
    },
    dehtmlize(fragment) {
      let xhtml = "<html>" + fragment + "</html>"
      let regex = new RegExp(/\w/)
      let xslt = new XSLTProcessor()
      let parser = new DOMParser()
      xslt.importStylesheet(parser.parseFromString(xsl, "text/xml"))
      let output = xslt.transformToFragment(parser.parseFromString(xhtml, "text/xml"), document).firstChild.nodeValue
      return JSON.parse(output).filter(text => text.match(regex))
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
    },
    currentComponent() {
      return this.card["Type"].toLowerCase()
    }
  }
}
