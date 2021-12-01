const initialValue = {
    posts: [],
    tags: [],
    isLoaded: true
};

export const postsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.payload,
                isLoaded: false
            }
        case 'GET_TAGS':
            return {
                ...state,
                tags: action.payload,
            }
        case 'POSTS_LOADED':
            return {
                ...state,
                isLoaded: action.payload
            }
        default:
            return state;
    }
}