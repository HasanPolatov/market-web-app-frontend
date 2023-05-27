<script setup>
import {ref} from "vue"
import axios from "axios";

const addingProduct = ref(false);
const newItem = ref({});

const props = defineProps(['adding', 'item', 'url', 'products', 'fields']);

const handleAdd = async (item) => {
  const response = await axios.post(props.url, item);
  props.products.push(response.data);
  addingProduct.value = false;
};

const startAdding = () => {
  addingProduct.value = true;
};

</script>

<template>
  <form @submit.prevent="handleAdd(newItem)">
    <template v-if="addingProduct">
      <input v-for="field of fields" :key="field.id" type="{{field.type}}" :placeholder="field.label"
             v-model="newItem[field.fieldName]">
      <button type="submit">Save</button>
    </template>
    <template v-else>
      <button @click="startAdding">Add</button>
    </template>
  </form>
</template>

<style scoped>

form {
  margin-top: 16px;
}

form input {
  display: inline-block;
  width: auto;
}

form button[type="submit"] {
  margin-left: 8px;
  width: 50px;
}

form button {
  background-color: #4caf50;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #3e8e41;
}

</style>