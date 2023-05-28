<template>

  <Product/>
<!--  <br>-->
<!--  <Category/>-->

</template>

<script>

import {defineComponent} from "vue";
import Product from "@/components/Product.vue";
import Category from "@/components/Category.vue";

export default defineComponent({
  components: {Category, Product}
})
</script>

<style>



</style>