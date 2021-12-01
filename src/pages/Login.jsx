import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { authAction } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';
import AuthService from '../services/AuthService';

const theme = createTheme();

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSubmit, setIsSubmit] = useState(false);
    const email = useInput('');
    const password = useInput('');

    const signIn = async (userEmail, userPassword) => {
        try {
            const response = await AuthService.signIn(userEmail, userPassword);
            dispatch(authAction(response));
            navigate('/');
        } catch (error) {
            let message = error.response.data.message;
            if (message === 'auth/email-not-found') {
                email.setError('Такого email не существует');
            } else if (message === 'auth/password-wrong') {
                password.setError('Неверный пароль');
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email.value) {
            email.setError('Введите email');
        } else if (!reg.test(email.value)) {
            email.setError('Введите корректный email');
        } else {
            email.setError('');
        }

        if (!password.value) {
            password.setError('Введите пароль');
        } else {
            password.setError('');
        }

        setIsSubmit(true);

    }

    useEffect(() => {
        if (isSubmit) {
            if (password.error || email.error) {
                setIsSubmit(false);
            } else {
                signIn(email.value, password.value);
            }
        }
    }, [password.error, email.error, isSubmit]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Войти
                    </Typography>
                    <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(e) => email.onChange(e)}
                            value={email.value}
                            error={email.error ? true : false}
                            helperText={email.error}
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            onChange={(e) => password.onChange(e)}
                            value={password.value}
                            error={password.error ? true : false}
                            helperText={password.error}
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container spacing={2} mb={2}>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<GoogleIcon />}
                                    fullWidth
                                >
                                    Google
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<FacebookIcon />}
                                    fullWidth
                                >
                                    Facebook
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<TwitterIcon />}
                                    fullWidth
                                >
                                    Twitter
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Link className="link" to="/registration">
                                    Зарегистрироваться
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}