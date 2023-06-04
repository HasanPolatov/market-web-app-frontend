import Product from "@/components/Product.vue";
import Category from "@/components/Category.vue";
import Home from "@/views/Home.vue";

export const routes = [
    { path: '/', component: Home },
    { path: "/products", component: Product },
    { path: "/categories", component: Category },
]