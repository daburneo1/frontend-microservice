// src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';
import { loginRequest, registerRequest } from '../hooks/useAuth.js';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (email, password, navigate, location) => {
        try {
            const { user, token } = await loginRequest(email, password);
            if (user && token) {
                setUser({ user, token });
                setError(null);
                const from = location.state?.from?.pathname || '/';
                navigate(from);
            } else {
                setError('Usuario no existe');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Credenciales incorrectas');
        }
    };

    const register = async (email, name, password, navigate) => {
        try {
            const { user, token } = await registerRequest(email, name, password);
            if (user && token) {
                setUser({ user, token });
                setError(null);
                navigate('/');
            } else {
                setError('Error en el registro');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Error en el registro');
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};