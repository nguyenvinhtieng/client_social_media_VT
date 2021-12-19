import { GLOBAL_TYPES } from './constants'
import { TOKEN_NAME } from '../../credentials'
import { postMethod } from '../../utils/fetchData'
import showToast from '../../utils/showToast';

export const userLogin = (user) => {
    return async (dispatch, getState) => {
        const res = await postMethod(`login`, user)
        const { data } = res
        if (data.success) {
            localStorage.setItem(TOKEN_NAME, data.token);
            dispatch({
                type: GLOBAL_TYPES.AUTH,
                payload: { isAuthenticated: true, user: data.user }
            })
            showToast("success", "Login In")
        } else {
            showToast("error", res.data.message)
        }
    }
}

export const userRegister = (user) => {
    return async (dispatch, getState) => {
        const res = await postMethod('register', user)
        let { data } = res
        if (data.success) {
            showToast("success", res.data.message)
        } else {
            showToast("error", res.data.message)
        }
    }
}