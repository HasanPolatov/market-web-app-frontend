<script setup>
import {ref} from "vue"
import axios from "axios";

const addingItem = ref(false);
const newItem = ref({});

const props = defineProps(['url', 'items', 'fields', 'isHasOptions', 'options']);

const handleAdd = async (item) => {
  const response = await axios.post(props.url, item);
  props.items.push(response.data);
  addingItem.value = false;
  newItem.value = {};
};

const startAdding = () => {
  addingItem.value = true;
};

</script>

<template class="add">
  <form @submit.prevent="handleAdd(newItem)">
    <template v-if="addingItem">
      <template v-for="field of fields" :key="field.id">
        <template v-if="field.isOption === false">
          <input type="{{field.type}}" :placeholder="field.label" v-model="newItem[field.fieldName]">
        </template>
        <template v-else>
          <select v-model="newItem[field.fieldName]">
            <option disabled selected>choose</option>
            <option
                v-for="(option, index) in options"
                :value="option.id"
                :key="index"
            >{{ option.name }}
            </option>
          </select>
        </template>
      </template>
      <button type="submit">Save</button>
    </template>
    <template v-else>
      <button @click="startAdding">Add</button>
    </template>
  </form>
</template>

<style scoped>

form {
  margin-top: 5px;
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