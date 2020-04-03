<template></template>
<script>
  import Prism from "prismjs/components/prism-core"
  import "prismjs/components/prism-clike"
  import "prismjs/components/prism-javascript"
  import "prismjs/components/prism-c"
  import "prismjs/components/prism-cpp"
  import "prismjs/components/prism-python"

  export default {
    methods: {
      highlight(element) {
        Prism.highlightAllUnder(element)
      }
    }
  }
</script>
