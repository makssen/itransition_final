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
import AuthService from '../services/AuthService';
import { useDispatch } from 'react-redux';
import { authAction } from '../store/actions/userActions';

const theme = createTheme();

export const SignUp = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isSubmit, setIsSubmit] = useState(false);
    const username = useInput('');
    const email = useInput('');
    const password = useInput('');
    const repeatPassword = useInput('');

    const signUp = async (username, newEmail, password) => {
        try {
            const response = await AuthService.signUp(username, newEmail, password);
            dispatch(authAction(response));
            navigate('/');
        } catch (error) {
            if (error.response.data.message) {
                email.setError('Такой email уже существует');
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!username.value) {
            username.setError('Введите имя пользователя');
        } else if (username.value < 3) {
            username.setError('Имя пользователя должно быть больше 3 символов');
        } else {
            username.setError('');
        }

        if (!email.value) {
            email.setError('Введите email');
        } else if (!reg.test(email.value)) {
            email.setError('Введите корректный email');
        } else {
            email.setError('');
        }

        if (!password.value) {
            password.setError('Придумайте пароль от 6 до 15 символов');
        } else if (password.value.length < 6 || password.value.length > 15) {
            password.setError('Пароль должен состоять от 6 до 15 символов');
        } else {
            password.setError('');
        }

        if (password.value !== repeatPassword.value) {
            repeatPassword.setError('Пароли не совпадают');
        } else {
            repeatPassword.setError('');
        }

        setIsSubmit(true);

    }

    useEffect(() => {
        if (isSubmit) {
            if (username.error || password.error || email.error || repeatPassword.error) {
                setIsSubmit(false);
            } else {
                signUp(username.value, email.value, password.value);
            }
        }
    }, [username.error, password.error, email.error, repeatPassword.error, isSubmit]);

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
                        Зарегистрироваться
                    </Typography>
                    <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(e) => username.onChange(e)}
                            value={username.value}
                            error={username.error ? true : false}
                            helperText={username.error}
                            margin="normal"
                            fullWidth
                            name="username"
                            label="Имя"
                            id="name"
                        />
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
                        <TextField
                            onChange={(e) => repeatPassword.onChange(e)}
                            value={repeatPassword.value}
                            error={repeatPassword.error ? true : false}
                            helperText={repeatPassword.error}
                            margin="normal"
                            fullWidth
                            name="repeatPassword"
                            label="Повторите пароль"
                            type="password"
                            id="repeatPassword"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Зарегистрироваться
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
                                <Link className="link" to="/login">
                                    Войти
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
