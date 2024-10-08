import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter(item => item.id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => {
    return useContext(CartContext);
};