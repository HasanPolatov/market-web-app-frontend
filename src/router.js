import Home from "@/views/Home.vue";
import Products from "@/views/Product.vue";
import Category from "@/views/Category.vue";
import Login from "@/views/Login.vue";
import Main from "@/layout/Main.vue";
import Auth from "@/layout/Auth.vue";
export const routes = [
    {
        path: '/',
        component: Main,
        name: 'Main',
        redirect: '/home',
        children: [
            {
                path: "products",
                name: 'Products',
                component: Products,
            },
            {
                path: "categories",
                name: 'Category',
                component: Category,
            },
            {
                path: "home",
                name: 'Home',
                component: Home
            }
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth,
        redirect: '/auth/login',
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login
            }
        ]
    }
]