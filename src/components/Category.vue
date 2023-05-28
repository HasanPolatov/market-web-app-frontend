<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import Table from "@/components/ui/Table.vue";

const categories = ref([{id: 0, name: ""}]);

const fields = [
  {
    fieldName: 'name',
    label: 'Name',
    type: 'text'
  }
];

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    categories.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <div>
    <Table
        :fields="fields"
        :table-data="categories"/>
  </div>
</template>

<style scoped>

</style>