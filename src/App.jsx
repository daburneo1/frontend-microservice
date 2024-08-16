import { CartProvider } from './context/CartContext';
import Header from './template/Header';
import ProductDetail from './products/detail/ProductDetail';
import ProductList from './products/ProductList';
import Landing from './landing/Landing';
import AddProduct from './products/AddProduct';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Login from './login/login';
import SignIn from './login/signUp.jsx';
import OrderPage from './orders/OrderPage';
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
                    <Route path="/register" element={<SignIn />} />
                    <Route path="/order-details" element={<OrderPage />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/" element={<Landing />} />
                </Routes>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;