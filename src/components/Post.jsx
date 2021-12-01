import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Box } from '@mui/system';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';

export const Post = ({ id, title, dateTime, grade, images }) => {

    const navigate = useNavigate();

    return (
        <Grid item xs={12} sm={6} onClick={() => navigate(`/overview/${id}`)}>
            <Box mr={3} mb={3}>
                <Card elevation={3}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="220"
                            image={images[0]}
                            alt={title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {title}
                            </Typography>
                            <Grid container alignItems="center">
                                <StarBorderIcon color="warning" />
                                <Grid item sx={{ fontSize: 20, color: '#ed6c02' }}>
                                    {grade}
                                </Grid>
                            </Grid>
                            <Typography mt={1} variant="body2" color="text.secondary">
                                {new Date(dateTime).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Grid>
    );
}
