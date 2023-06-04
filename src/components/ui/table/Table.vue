<script setup>

import {computed, ref} from "vue";
import Option from "@/components/utils/Option.vue";
import TableButtons from "@/components/ui/table/TableButtons.vue";
import http from "@/features/http";

const editingIndex = ref(null);

const props = defineProps(['tableData', 'fields', 'isAction', 'url', 'isHasOptions', 'options']);

const handleEdit = async (item) => {
  await http.put(props.url, item);
  editingIndex.value = null;
};

const handleDelete = async (index) => {
  await http.delete(props.url + "/" + props.tableData[index].id);
  props.tableData.splice(index, 1);
};

const startEditing = (index) => {
  editingIndex.value = index;
};

const getOptionName = computed(() => {
  return (optionId) => {
    const option = props.options.find((option) => option.id === optionId);
    return option ? option.name : "";
  };
});

</script>

<template>
  <table>
    <tr>
      <th v-for="(field, thIndex) of fields" :key="`th-${thIndex}`">{{ field.label }}</th>
      <th v-if="isAction">Action</th>
    </tr>
    <tr v-for="(item, index) of tableData" :key="`table-${index}`">
      <td v-for="(field, trIndex) of fields" :key="`tr-${trIndex}`">
        <template v-if="isHasOptions && field.isId">
          <template v-if="editingIndex === index">
            <select v-model="item[field.fieldName]">
              <option disabled selected>choose</option>
              <Option :options="options"/>
            </select>
          </template>
          <template v-else>{{ getOptionName(item[field.fieldName]) }}</template>
        </template>
        <template v-else>
          <template v-if="editingIndex === index">
            <input type="text" v-model="item[field.fieldName]"/>
          </template>
          <template v-else>{{ item[field.fieldName] }}</template>
        </template>
      </td>
      <td v-if="isAction" class="action">
        <TableButtons :item="item" :editing-index="editingIndex" :index="index" @delete="handleDelete(index)"
                      @edit="handleEdit(item)" @start-editing="startEditing(index)"/>
      </td>
    </tr>
  </table>
</template>

<style scoped>
/* ... */
</style>


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