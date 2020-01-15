<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button v-if="closing" type="button" class="close" data-dismiss="modal">
            <span class="fas fa-times"></span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: [ "title", "closing" ],
    mounted() {
      let options = {
        "show": false
      }
      if (!this.closing) {
        options["backdrop"] = "static"
        options["keyboard"] = false
      }
      $(this.$el).modal(options)
    }
  }
</script>
