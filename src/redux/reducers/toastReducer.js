import { GLOBAL_TYPES } from '../actions/constants'
const initialState = { hasToast: false, type: "", message: "" }
function toastReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.TOAST:
            return action.payload
        default:
            return state
    }
}
export default toastReducer;
