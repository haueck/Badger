<template>
  <div>
    <p>
      <strong>{{ card['Word'] }}</strong> /{{ card['Pronunciation'] }}/ - {{ card['Definition'] }}
    </p>
    <p v-for="example in card['Examples']" class="mb-1">
      <i>{{ example }}</i>
    </p>
  </div>
</template>
<script>
  export default {
    props: [ "card" ]
  }
</script>
