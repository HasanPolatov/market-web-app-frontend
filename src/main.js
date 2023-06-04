import './assets/main.css'
import {createRouter, createWebHistory} from 'vue-router';
import {createPinia} from 'pinia'
import {routes} from "@/router";
import {userData} from "@/store/user-data";
import {createApp} from 'vue'
import App from './App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const data = userData();
    if (to.name !== 'Login' && data.getAuthToken === null) {
        next({name: 'Login'});
    } else {
        next();
    }
})


const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
