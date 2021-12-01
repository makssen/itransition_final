import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultLayout } from '../components/DefaultLayout';
import { Post } from '../components/Post';
import { PostLoader } from '../components/PostLoader';
import { TagsCloud } from '../components/TagsCloud';
import { getPostsAction, getTagsAction } from '../store/actions/postsAction';

export const Home = () => {

    const dispatch = useDispatch();
    const { posts, tags, isLoaded } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(getTagsAction());
        dispatch(getPostsAction());
    }, []);

    return (
        <DefaultLayout>
            <h2 className="title">Обзоры</h2>
            <TagsCloud tags={tags} />
            <Grid container justifyContent="space-between">
                {isLoaded ?
                    Array(4).fill(0).map((_, i) => <PostLoader key={i} />)
                    :
                    posts.map((item, i) => <Post key={i} {...item} />)
                }
            </Grid>
        </DefaultLayout>
    )
}
