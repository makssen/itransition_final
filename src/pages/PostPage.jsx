import { Grid, IconButton, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DefaultLayout } from '../components/DefaultLayout';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Comments } from '../components/Comments';
import { Box } from '@mui/system';
import PostService from '../services/PostService';
import { PostTags } from '../components/PostTags';

export const PostPage = () => {

    const comments = [
        {
            username: 'Vitold',
            dateTime: '2021-11-16T10:55:25+00:00',
            text: 'Не следует, однако забывать, что укрепление и развитие'
        },
        {
            username: 'Maks',
            dateTime: '2021-11-16T10:55:25+00:00',
            text: 'Не следует, однако забывать, что укрепление и развитие'
        }
    ]

    const [post, setPost] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        PostService.getById(id)
            .then(resp => setPost(resp))
            .catch((e) => navigate('/'))
    }, []);

    return (
        <DefaultLayout>
            {post &&
                <Box mr={2}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography variant="h5">{post.title}</Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" ml={1}>
                                        <StarBorderIcon color="warning" />
                                        <Grid item sx={{ fontSize: 20, color: '#ed6c02' }}>
                                            {post.grade}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography mb={1} variant="body2" color="text.secondary">{new Date(post.dateTime).toLocaleDateString()}</Typography>
                                <PostTags tags={post.tags} />
                            </Grid>
                        </Grid>
                        <Grid item sm={6} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <img className="image" src={post.images[0]} alt={post.title} />
                        </Grid>
                        <Grid item>
                            <Typography mt={3} mb={3} variant="body1">{post.text}</Typography>
                            <Grid item>
                                {post.images.map((item, i) => <img key={i} className="image" src={item} alt={`${post.title}i`} />)}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid container alignItems="center">
                                <Typography mt={1} mb={1} mr={1} variant="h6">Поставьте рейтинг</Typography>
                                <Rating size="large" name="rating" defaultValue={0} />
                            </Grid>
                            <Grid container alignItems="center">
                                <IconButton size="large">
                                    <FavoriteIcon />
                                </IconButton>
                                <Typography variant="h6" color="text.secondary">3</Typography>
                            </Grid>
                        </Grid>
                        <Comments comments={comments} />
                    </Grid>
                </Box>
            }
        </DefaultLayout >
    );
}