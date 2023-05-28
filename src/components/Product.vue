<script setup>
import {onMounted, ref, watchEffect} from "vue";

import Table from "@/components/ui/Table.vue";
import AddItemForm from "@/components/ui/AddItemForm.vue";

import {fetchProducts, fetchCategories} from "@/services/apiService";

const productsList = ref([{id: 0, name: "", price: "", categoryId: ""}]);
const categoriesList = ref([{id: 0, name: ""}]);
const selectedCategoryId = ref(null);

const fields = [
  {
    fieldName: 'name',
    label: 'Name',
    type: 'text',
    isOption: false
  },
  {
    fieldName: 'price',
    label: 'Price',
    type: 'text',
    isOption: false
  },
  {
    fieldName: 'categoryId',
    label: 'Category',
    type: 'text',
    isOption: true
  }
];

onMounted(async () => {
  categoriesList.value = await fetchCategories();
  productsList.value = await fetchProducts();
});

watchEffect(async () => {
  productsList.value = await fetchProducts(selectedCategoryId.value);
});

</script>

<template>

  <div class="selectAdd">
    <select v-model="selectedCategoryId">
      <option :value="null">all</option>
      <option
          v-for="(category, index) in categoriesList"
          :value="category.id"
          :key="index"
      >{{ category.name }}
      </option>
    </select>

    <div class="addProduct">
      <AddItemForm
          :items="productsList"
          :fields="fields"
          :is-has-options="true"
          :options="categoriesList"
          :url="`http://localhost:8080/api/product`"/>
    </div>
  </div>


  <div>
    <Table
        :table-data="productsList"
        :fields="fields"
        :is-action="true"
        :url="`http://localhost:8080/api/product`"/>
  </div>

</template>

<style>

select {
  font-size: 16px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

option {
  font-size: 16px;
}

.selectAdd {
  display: flex;
}

.addProduct {
  align-items: center;
  padding-left: 10px;
}

</style>


