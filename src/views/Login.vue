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
      .post("/authenticate", authLogin.value)
      .then((response) => {
            data.setAuthToken(response.data.jwtToken);
            router.push({name: 'Main'})
          }
      );
}
</script>

<template>
  <div class="login-form">
    <label for="username">Username</label>
    <input type="text" name="username" v-model="authLogin.username">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="authLogin.password">
    <button @click="login()">Login</button>
  </div>
</template>

<style scoped>

.login-form {
  width: 400px;
  margin: 80px auto;
  padding: 20px;
  border: 1px solid #ccc;
}

.login-form label {
  font-size: 16px;
  font-weight: bold;
}

.login-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}

.login-form button {
  background-color: #04AA6D;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border: none;
  cursor: pointer;
}

</style>