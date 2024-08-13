const API = import.meta.env.VITE_NODE_GATEWAY;

export async function addOrder(order) {
    const response = await fetch(`${API}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (!response.ok && response.status !== 201) {
        throw new Error('Order failed');
    }

    return response.json();
}