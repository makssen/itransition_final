import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Comment = ({ username, dateTime, text }) => {
    return (
        <Grid item xs={12} mb={2}>
            <Paper elevation={3} sx={{ p: 1 }}>
                <Grid container alignItems="center">
                    <Typography mr={1} variant="h6">{username}</Typography>
                    <Typography variant="body2" color="text.secondary">{new Date(dateTime).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item>
                    <Typography mt={1} textAlign="justify" variant="body1">{text}</Typography>
                </Grid>
            </Paper>
        </Grid>
    );
}

export const Comments = ({ comments }) => {
    return (
        <Grid container direction="column" mt={3}>
            <Typography variant="h5">Комментарии</Typography>
            <Grid item>
                <Box component="form" mt={2} mb={3}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Добавьте комментарий"
                    />
                    <Button sx={{ mt: 1 }} variant="contained" size="large" color="primary">Добавить</Button>
                </Box>
            </Grid>
            <Grid container>
                {comments.map((item, i) => <Comment key={i} {...item} />)}
            </Grid>
        </Grid>
    );
}
