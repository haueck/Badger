<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog" :class="{ 'modal-sm': size == 'small', 'modal-lg': size == 'large' }">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button v-if="closing" type="button" class="close" data-dismiss="modal">
            <span class="fas fa-times"></span>
          </button>
        </div>
        <div class="modal-body p-0">
          <slot></slot>
        </div>
        <div v-if="footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      size: {
        type: String,
        default: "regular"
      },
      title: {
        type: String,
        default: ""
      },
      closing: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      let options = {
        "show": false
      }
      if (!this.closing) {
        options["backdrop"] = "static"
        options["keyboard"] = false
      }
      $(this.$el).modal(options)
    },
    computed: {
      footer() {
        return !!this.$slots.footer
      }
    }
  }
</script>
