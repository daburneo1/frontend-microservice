import { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../hooks/useProducts';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct({ name, price });
            navigate('/products');
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Agregar Nuevo Producto
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Nombre del Producto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Precio"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Agregar Producto
                </Button>
            </Box>
        </Container>
    );
}

export default AddProduct;