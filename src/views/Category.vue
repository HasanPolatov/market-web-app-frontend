<script setup>

import {onMounted, ref} from "vue";
import Table from "@/components/ui/table/Table.vue";

import {fetchCategories} from "@/services/apiService";

const categories = ref([{id: 0, name: ""}]);

const fields = [
  {
    fieldName: 'name',
    label: 'Name',
    type: 'text'
  }
];

onMounted(async () => {
  categories.value = await fetchCategories();
});

</script>

<template>
  <div>
    <Table
      :table-data="categories"
      :fields="fields"
      :is-action="false"
      :is-has-options="false"/>
  </div>
</template>

<style scoped>

</style>