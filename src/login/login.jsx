import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Card, CardHeader, CardContent, TextField, Button, Alert } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password, navigate, location);
        } catch (err) {
            console.error('Handle login error:', err);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Login" titleTypographyProps={{ align: 'center' }} />
                        <CardContent>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    label="Nombre de usuario"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {error && <Alert severity="error">{error}</Alert>}
                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Ingresar
                                </Button>
                                <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
                                    Registrarse
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;