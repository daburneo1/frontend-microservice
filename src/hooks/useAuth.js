const API = import.meta.env.VITE_NODE_GATEWAY;

export async function loginRequest(email, password) {
    console.log(API); // This should now log the correct API endpoint
    const response = await fetch(`${API}auth/login`, { // Ensure the correct endpoint is used
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok && response.status !== 201) {
        throw new Error('Login failed');
    }

    return response.json();
}

export async function registerRequest(email, name, password) {
    const response = await fetch(`${API}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
    });

    if (!response.ok && response.status !== 201) {
        throw new Error('Registration failed');
    }

    return response.json();
}