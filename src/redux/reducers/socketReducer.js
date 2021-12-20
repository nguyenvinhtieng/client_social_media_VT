import { GLOBAL_TYPES } from '../actions/constants'
const initialState = { socket: {} }
function socketReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.SOCKET:
            return action.payload
        default:
            return state
    }
}
export default socketReducer;
