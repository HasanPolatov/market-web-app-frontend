<script setup>

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/categories">Categories</router-link>
  </nav>
  <router-view/>
</template>

<style scoped>
nav a {
  background-color: #4caf50;
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

</style>
