import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from './Banner.jsx';
import FeatureProduct from './FeatureProduct.jsx';
import ScrollToTopOnMount from '../template/ScrollToTopOnMount.jsx';
import { fetchProducts } from '../hooks/useProducts.js';

function Landing() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts(1, 6)
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data && Array.isArray(data.data)) {
                    setProducts(data.data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    return (
        <>
            <ScrollToTopOnMount />
            <Banner />
            <Box sx={{ py: 4, bgcolor: 'background.paper' }}>
                <Typography variant="body1" align="center" paragraph>
                    Tienda virtual destinada a la venta de productos tecnológicos de última generación
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Button component={Link} to="/products" variant="contained" color="primary">
                        Ver productos
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                    <Button variant="contained" color="secondary" onClick={handleAddProduct}>
                        Agregar Producto
                    </Button>
                </Box>
            </Box>
            <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
                Recien llegados
            </Typography>
            <Container sx={{ pb: 5 }}>
                <Grid container spacing={4}>
                    {products && products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <FeatureProduct product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Box sx={{ py: 4, bgcolor: 'background.paper' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Siguenos en
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Box component="a" href="!#" sx={{ mx: 1 }}>
                        <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" />
                    </Box>
                    <Box component="a" href="!#" sx={{ mx: 1 }}>
                        <FontAwesomeIcon icon={['fab', 'instagram']} size="2x" />
                    </Box>
                    <Box component="a" href="!#" sx={{ mx: 1 }}>
                        <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Landing;