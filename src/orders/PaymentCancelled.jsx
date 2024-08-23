import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const PaymentCancelled = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/'); // Redirect to landing page
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <CancelIcon className="cancel-icon" color="error" style={{ fontSize: 100 }} />
            <Typography variant="h4" gutterBottom>
                Su compra ha sido cancelada
            </Typography>
            <Button variant="contained" color="primary" onClick={handleRedirect}>
                Volver a la página principal
            </Button>
        </Box>
    );
};

export default PaymentCancelled;