import authReducer from "./authReducer";
import postReducer from "./postReducer";
import loadingReducer from "./loadingReducer";
import profileUserReducer from "./profileUserReducer";
import socketReducer from './socketReducer'
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
    loading: loadingReducer,
    profile_user: profileUserReducer,
    socket: socketReducer
})

export default rootReducer