import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const Loader = () => {
    return (
        <Grid container sx={{ height: '100vh' }} alignItems="center" justifyContent="center">
            <CircularProgress />
        </Grid>
    );
}
