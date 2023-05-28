import axios from "axios";

export async function fetchCategories() {
    try {
        const response = await axios.get("http://localhost:8080/api/categories");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchProducts(categoryId) {

    try {
        const url = categoryId != null
            ? `http://localhost:8080/api/products?categoryId=${categoryId}`
            : "http://localhost:8080/api/products";
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
