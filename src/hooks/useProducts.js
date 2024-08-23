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
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}

export async function fetchProductById(id) {
    try {
        const response = await axios.get(`${API}products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
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
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}

export async function deleteProductById(id) {
    try {
        const response = await axios.delete(`${API}products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
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
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
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
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}