import { GLOBAL_TYPES } from '../actions/constants'
const initialState = {
    user: null,
    posts: []
}
function profileUserReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.PROFILE_USER:
            return action.payload
        default:
            return state
    }
}
export default profileUserReducer;
