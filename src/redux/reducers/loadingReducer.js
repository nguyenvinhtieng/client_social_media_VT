import { GLOBAL_TYPES } from '../actions/constants'
const initialState = false
function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.LOADING:
            return action.payload
        default:
            return state
    }
}
export default loadingReducer;
