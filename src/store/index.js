import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { userReducer } from "./reducers/userReducer";
import { postsReducer } from "./reducers/postsReducer";

const root = combineReducers({
    user: userReducer,
    posts: postsReducer
});

export const store = createStore(root, applyMiddleware(thunk));