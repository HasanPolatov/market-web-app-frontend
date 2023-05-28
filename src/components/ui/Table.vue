<script setup>

import {ref} from "vue";
import axios from "axios";

const editingIndex = ref(null);

const props = defineProps(['tableData', 'fields', 'isAction', 'url']);

const handleEdit = async (item) => {
  await axios.put(props.url, item);
  editingIndex.value = null;
};

const handleDelete = async (index) => {
  await axios.delete(props.url + "/" + props.tableData[index].id);
  props.tableData.splice(index, 1);
};

const startEditing = (index) => {
  editingIndex.value = index;
};

</script>

<template>

  <table>
    <tr>
      <th v-for="(field, thIndex) of fields" :key="`th-${thIndex}`">{{ field.label }}</th>
      <th v-if="isAction">Action</th>
    </tr>
    <tr v-for="(item, index) of tableData" :key="`table-${index}`">
      <td v-for="(field, trIndex) of  fields" :key="`tr-${trIndex}`">
        <template v-if="editingIndex === index">
          <input type="text" v-model="item[field.fieldName]">
        </template>
        <template v-else>{{ item[field.fieldName] }}</template>
      </td>
      <td v-if="isAction" class="action">
        <template v-if="editingIndex === index">
          <button @click="handleEdit(item)">Save</button>
        </template>
        <template v-else>
          <button @click="startEditing(index)">Edit</button>
        </template>

        <button @click="handleDelete(index)">Delete</button>
      </td>
    </tr>
  </table>

</template>

<style scoped>

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  background-color: #4caf50;
  color: white;
}

td {
  vertical-align: middle;
}

.action {
  display: flex;
}

button + button {
  margin-left: 8px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}

input[type="text"],
input[type="number"] {
  display: block;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #100c0c;
  border-radius: 4px;
}

input[type="text"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #4caf50;
}

th {
  width: 40%;
}

td:first-child {
  width: 40%;
}

td:last-child {
  width: 20%;
}

</style>