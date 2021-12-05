import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DefaultLayout } from '../components/DefaultLayout';
import { Post } from '../components/Post';
import { PostLoader } from '../components/PostLoader';
import PostService from '../services/PostService';

export const SearchPage = () => {

    const [posts, setPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const { query } = useParams();

    useEffect(() => {
        setIsLoaded(true);
        PostService.search(query)
            .then(resp => {
                setPosts(resp);
                setIsLoaded(false);
            })
    }, [query]);

    return (
        <DefaultLayout>
            <h2 className="title">Обзоры</h2>
            <Grid container justifyContent="space-between">
                {isLoaded ? <PostLoader /> : posts.map((item, i) => <Post key={i} {...item} />)}
            </Grid>
        </DefaultLayout>
    );
}
