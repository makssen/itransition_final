const initialValue = {
    user: {},
    isAuth: false,
    isLoaded: true
};

export const userReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuth: true
            }
        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload
            }
        default:
            return state;
    }
}