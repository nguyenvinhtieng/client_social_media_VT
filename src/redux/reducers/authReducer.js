import { GLOBAL_TYPES } from '../actions/constants'
const initialState = {}
function authReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.AUTH:
            return action.payload
        default:
            return state
    }
}
export default authReducer;
