
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DefaultLayout } from '../components/DefaultLayout';
import PostService from '../services/PostService';
import { CreateForm } from '../components/CreateForm';

export const EditPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [post, setPost] = useState({});
    const [isLoaded, setIsLoaded] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (isSubmit) {
            console.log(post);
            PostService.update(id, post)
                .then(navigate('/'))
                .catch(e => console.log(e))
        }
    }, [post]);

    useEffect(() => {
        setIsLoaded(true);
        PostService.getById(id)
            .then(resp => {
                setPost(resp);
                setIsLoaded(false);
            })
            .catch((e) => navigate('/'))
    }, []);

    return (
        <DefaultLayout>
            <h2 className="title">Изменить обзор</h2>
            {!isLoaded &&
                <CreateForm post={post} setPost={setPost} isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
            }
        </DefaultLayout>
    );
}
