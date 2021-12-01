import PostService from "../../services/PostService";

export const postsLoadedAction = (payload) => ({
    type: 'POSTS_LOADED',
    payload
})

export const getPostsAction = () => (dispatch) => {
    dispatch(postsLoadedAction(true))
    PostService.getAll()
        .then(resp => dispatch({ type: 'GET_POSTS', payload: resp }))
}

export const getTagsAction = () => (dispatch) => {
    PostService.getTags()
        .then(resp => dispatch({ type: 'GET_TAGS', payload: resp }))
}