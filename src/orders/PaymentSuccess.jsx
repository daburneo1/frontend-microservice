import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/'); // Redirect to landing page
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <CheckCircleIcon className="checkmark-animation" color="success" style={{ fontSize: 100 }} />
            <Typography variant="h4" gutterBottom>
                Muchas gracias por su compra
            </Typography>
            <Button variant="contained" color="primary" onClick={handleRedirect}>
                Volver a la página principal
            </Button>
        </Box>
    );
};

export default PaymentSuccess;