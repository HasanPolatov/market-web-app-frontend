<script setup>

defineProps(['options']);

</script>

<template>
  <option
      v-for="(options, index) in options"
      :value="options.id"
      :key="index"
  >{{ options.name }}
  </option>
</template>

<style scoped>

</style>