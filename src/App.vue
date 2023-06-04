<script setup>


</script>

<template>
  <nav>
    <router-link to="/" active-class="active-link">Home</router-link>
    <router-link to="/products" active-class="active-link">Products</router-link>
    <router-link to="/categories" active-class="active-link">Categories</router-link>
  </nav>
  <router-view/>
</template>

<style scoped>

nav a {
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

nav a:hover {
  background-color: #3e8e41;
}

nav a.active-link {
  background-color: #333;
}


</style>