import http from "@/features/http";

export async function fetchCategories() {
    try {
        const response = await http.get("http://localhost:8080/api/categories");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchProducts(categoryId) {

    try {
        const url = categoryId != null
            ? `http://localhost:8080/api/products?categoryId=${categoryId}&sort=id`
            : "http://localhost:8080/api/products?sort=id";
        const response = await http.get(url);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
