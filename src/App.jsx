// src/App.jsx
import { CartProvider } from './context/CartContext';
import Header from './template/Header';
import ProductDetail from './products/detail/ProductDetail';
import ProductList from './products/ProductList';
import Landing from './landing/Landing';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Login from './login/login';
import SignUp from './login/signUp';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Header />
                <Routes>
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/" element={<Landing />} />
                </Routes>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;