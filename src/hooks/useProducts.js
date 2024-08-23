import axios from 'axios';

const API = import.meta.env.VITE_NODE_GATEWAY;

export async function fetchProducts(page, limit) {
    try {
        const response = await axios.get(`${API}products`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function fetchProductById(id) {
    try {
        const response = await axios.get(`${API}products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
}

export async function updateProductById(id, productData) {
    try {
        const response = await axios.patch(`${API}products/${id}`, productData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product by ID:', error);
        throw error;
    }
}

export async function deleteProductById(id) {
    try {
        const response = await axios.delete(`${API}products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        throw error;
    }
}

export async function cancelOrder(orderId) {
    try {
        const response = await axios.patch(`${API}orders/${orderId}`, { status: 'CANCELLED' }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error canceling order:', error);
        throw error;
    }
}

export async function addProduct(productData) {
    try {
        const response = await axios.post(`${API}products`, productData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}