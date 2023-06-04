<script setup>
import {ref} from "vue";
import http from "@/features/http";
import {userData} from "@/store/user-data";
import {useRouter} from "vue-router";

const data = userData();
const router = useRouter();

const authLogin = ref({
  username: '',
  password: ''
})

const login = async () => {
  http
      .post("http://localhost:8080/authenticate", authLogin.value)
      .then((response) => {
            data.setAuthToken(response.data.jwtToken);
            router.push({name: 'Main'})
          }
      );
}
</script>

<template>
  <div>
    <label for="username">Login</label>
    <input type="text" name="username" v-model="authLogin.username">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="authLogin.password">
    <button @click="login()">Login</button>
  </div>
</template>

<style scoped>

</style>