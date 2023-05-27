<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import Table from "@/components/ui/Table.vue";
import AddProductForm from "@/components/ui/AddItemForm.vue";

const products = ref([{id: 0, name: "", price: ""}]);

const product = ref({
  id: 0,
  price: 0,
  categoryId: 0
});

const addingProduct = ref(false);

const fields = [
  {
    fieldName: 'name',
    label: 'Name',
    type: 'text'
  },
  {
    fieldName: 'price',
    label: 'Price',
    type: 'text'
  }
];

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products");
    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

const startAdding = () => {
  addingProduct.value = true;
};

</script>

<template>

  <div>
    <Table
        :table-data="products"
        :fields="fields"
        :is-action="true"
        :url="`http://localhost:8080/api/product`"/>
  </div>

  <div>
    <AddProductForm
        :adding="addingProduct"
        :item="product"
        :products="products"
        :fields="fields"
        :url="`http://localhost:8080/api/product`"
        @add="addProduct"
        @start-adding="startAdding"/>
  </div>

</template>

<style>

</style>


