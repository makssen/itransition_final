import { Grid, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

export const PostLoader = () => {
    return (
        <Grid item xs={12} sm={6}>
            <Box mr={3} mb={3}>
                <Skeleton variant="rectangular" width="100%" height={220} />
            </Box>
        </Grid>
    );
}
