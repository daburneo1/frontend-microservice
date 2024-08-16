import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Typography, List, ListItem, ListItemText, Grid, Container } from '@mui/material';
import {cancelOrder} from "../hooks/useProducts.js";

function OrderDetails({ order, paymentSession }) {
    const [orderStatus, setOrderStatus] = useState(order.status);

    const handleCancelOrder = async () => {
        try {
            const updatedOrder = await cancelOrder(order.id);
            setOrderStatus(updatedOrder.status);
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Order Details
            </Typography>
            <Typography variant="h6">Order ID: {order.id}</Typography>
            <Typography variant="body1">Total Amount: {order.totalAmount} USD</Typography>
            <Typography variant="body1">Total Items: {order.totalItems}</Typography>
            <Typography variant="body1">Status: {orderStatus}</Typography>
            <List>
                {order.orderItem.map((item, index) => (
                    <ListItem key={index}>
                        <Grid container>
                            <Grid item xs={6}>
                                <ListItemText primary={item.name} />
                            </Grid>
                            <Grid item xs={3}>
                                <ListItemText primary={`Price: ${item.price} USD`} />
                            </Grid>
                            <Grid item xs={3}>
                                <ListItemText primary={`Quantity: ${item.quantity}`} />
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
            <Button
                variant="contained"
                color="primary"
                href={paymentSession.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: '10px' }}
            >
                Proceed to Payment
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelOrder}>
                Cancel Order
            </Button>
        </Container>
    );
}

OrderDetails.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        totalAmount: PropTypes.number.isRequired,
        totalItems: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        orderItem: PropTypes.arrayOf(
            PropTypes.shape({
                price: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
                productId: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    paymentSession: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
};

export default OrderDetails;