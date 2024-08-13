// src/hooks/useProducts.js
const API = import.meta.env.VITE_NODE_GATEWAY;

export async function fetchProducts(page, limit) {
    const response = await fetch(`${API}products?page=${page}&limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export async function fetchProductById(id) {
    const response = await fetch(`${API}products/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return response.json();
}

export async function updateProductById(id, productData) {
    const response = await fetch(`${API}products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        throw new Error('Failed to update product');
    }

    return response.json();
}

export async function deleteProductById(id) {
    const response = await fetch(`${API}products/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete product');
    }

    return response.json();
}