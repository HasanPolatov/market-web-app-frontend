<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const productTable = ref([{id: 0, name: "", price: ""}]);
const editingIndex = ref(null);
const addingProduct = ref(false);
const newProductName = ref("");
const newProductPrice = ref("");

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products");
    productTable.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

const addProduct = async () => {
  const product = {name: newProductName.value, price: newProductPrice.value};
  const response = await axios.post(`http://localhost:8080/api/product`, product);
  productTable.value.push(response.data);
  addingProduct.value = false;
  newProductName.value = "";
  newProductPrice.value = "";
}

const deleteProduct = async (index) => {
  const product = productTable.value[index];
  await axios.delete(`http://localhost:8080/api/product/${product.id}`);
  productTable.value.splice(index, 1);
};

const startEditing = (index) => {
  editingIndex.value = index;
};

const startAdding = () => {
  addingProduct.value = true;
}
const editProduct = async (index) => {
  try {
    const product = productTable.value[index];
    await axios.put(`http://localhost:8080/api/product`, product);
    editingIndex.value = null;
  } catch (error) {
    console.error(error);
  }
};
</script>


<template>

  <table>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
    <tr v-for="(product, index) in productTable" :key="index">
      <td>
        <template v-if="editingIndex === index">
          <input type="text" v-model="product.name"/>
        </template>
        <template v-else>{{ product.name }}</template>
      </td>
      <td>
        <template v-if="editingIndex === index">
          <input type="number" v-model="product.price"/>
        </template>
        <template v-else>{{ product.price }}</template>
      </td>
      <td>
        <button @click="deleteProduct(index)">Delete</button>
        <template v-if="editingIndex === index">
          <button @click="editProduct(index)">Save</button>
        </template>
        <template v-else>
          <button @click="startEditing(index)">Update</button>
        </template>
      </td>
    </tr>
  </table>
  <form @submit.prevent="addProduct">
    <template v-if="addingProduct">
      <input type="text" v-model="newProductName" placeholder="product name">
      <input type="number" v-model="newProductPrice" placeholder="price">
      <button type="submit">Save</button>
    </template>
    <template v-else>
      <button @click="startAdding">Add</button>
    </template>
  </form>


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
  margin-bottom: 6px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="text"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #4caf50;
}

form {
  margin-top: 16px;
}

form input[type="text"],
form input[type="number"] {
  display: inline-block;
  width: auto;
}

form button[type="submit"] {
  margin-left: 8px;
  width: 50px;
}

form button {
  margin-left: 8px;
  width: 60px;
}

</style>


