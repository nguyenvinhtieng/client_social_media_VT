import authReducer from "./authReducer";
import postReducer from "./postReducer";
import loadingReducer from "./loadingReducer";
import profileUserReducer from "./profileUserReducer";
import toastReducer from './toastReducer'
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
    loading: loadingReducer,
    profile_user: profileUserReducer,
    toasting: toastReducer
})

export default rootReducer