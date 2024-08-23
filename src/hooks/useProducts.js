import axios from 'axios';

const API = import.meta.env.VITE_NODE_GATEWAY;

export async function fetchProducts(page, limit) {
    const response = await axios.get(`${API}products`, {
        params: { page, limit }
    });
    return response.data;
}

export async function fetchProductById(id) {
    const response = await axios.get(`${API}products/${id}`);
    return response.data;
}

export async function updateProductById(id, productData) {
    const response = await axios.patch(`${API}products/${id}`, productData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export async function deleteProductById(id) {
    const response = await axios.delete(`${API}products/${id}`);
    return response.data;
}

export async function cancelOrder(orderId) {
    const response = await axios.patch(`${API}orders/${orderId}`, { status: 'CANCELLED' }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export async function addProduct(productData) {
    const response = await axios.post(`${API}products`, productData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}