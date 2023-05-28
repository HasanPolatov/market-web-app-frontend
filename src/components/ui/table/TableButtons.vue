<script setup>

const props = defineProps(['item', 'editingIndex', 'index']);
const emits = defineEmits(['delete', 'edit', 'startEditing']);

const handleEdit = (item) => {
  emits('edit', item)
}
const handleDelete = (index) => {
  emits('delete', index)
}

const startEditing = (index) => {
  emits('startEditing', index);
}

</script>

<template>
  <template v-if="editingIndex === index">
    <button @click="handleEdit(item)">Save</button>
  </template>
  <template v-else>
    <button @click="startEditing(index)">Edit</button>
  </template>
  <button @click="handleDelete(index)">Delete</button>
</template>

<style scoped>

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

</style>