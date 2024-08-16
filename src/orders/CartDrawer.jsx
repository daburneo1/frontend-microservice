import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import { addOrder } from '../hooks/useOrders.js';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

function CartDrawer({ isOpen, toggleDrawer }) {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (productId, quantity) => {
        if (quantity > 0) {
            updateQuantity(productId, quantity);
        }
    };

    const createOrder = async () => {
        const order = {
            items: cartItems.map(item => ({
                productId: item.id,
                price: item.price,
                quantity: item.quantity
            }))
        };

        const { order: createdOrder, paymentSession } = await addOrder(order);
        clearCart();
        navigate('/order-details', { state: { order: createdOrder, paymentSession } });
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
            <div style={{ width: 400, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">Shopping Cart</Typography>
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div>
                    {cartItems.length === 0 ? (
                        <Typography>No items in the cart.</Typography>
                    ) : (
                        <List>
                            {cartItems.map((item, index) => (
                                <ListItem key={index}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={12}>
                                            <ListItemText primary={`${item.name} - ${item.price} USD`} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ButtonGroup>
                                                <Button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</Button>
                                                <Button disabled>{item.quantity}</Button>
                                                <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                                            </ButtonGroup>
                                            <Button onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
                <div style={{ marginTop: 16 }}>
                    <Button variant="contained" color="primary" onClick={createOrder}>Crear Orden</Button>
                </div>
            </div>
        </Drawer>
    );
}

CartDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
};

export default CartDrawer;