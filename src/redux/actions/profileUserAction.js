import { getMethod, postMethod, putMethod } from '../../utils/fetchData'
import { GLOBAL_TYPES } from './constants'

export const getPostAndUser = (slug, page = 0) => {
    return async (dispatch, getState) => {
        let { profile_user } = getState()
        dispatch({ type: GLOBAL_TYPES.LOADING, payload: true })
        let res = await getMethod(`posts?user=${slug}&page=${page}`)
        let data = res.data
        if (data.success) {
            dispatch({
                type: GLOBAL_TYPES.PROFILE_USER,
                payload: {
                    ...profile_user,
                    user: data.user,
                    posts: (page === 0) ? [...data.posts] : [...profile_user.posts, ...data.posts],
                }
            })
            dispatch({ type: GLOBAL_TYPES.LOADING, payload: false })

        } else {
            alert(data.message)
        }
    }
}
export const addCommentUser = (comment) => {
    return async (dispatch, getState) => {
        let { profile_user } = getState()
        let res = await postMethod('comments', comment)
        let data = res.data
        if (data.success) {
            let newPosts = profile_user.posts.map(post => {
                if (post._id === comment.post_id) {
                    return { ...post, comments: [data.comment, ...post.comments] }
                } else {
                    return post
                }
            })
            dispatch({
                type: GLOBAL_TYPES.PROFILE_USER,
                payload: { ...profile_user, posts: newPosts }
            })
        } else {
            alert(data.message)
        }
    }
}

export const updateUser = (dt) => {
    return async (dispatch, getState) => {
        let { profile_user, auth } = getState()
        dispatch({ type: GLOBAL_TYPES.LOADING, payload: true })
        let res = await putMethod("users", dt)
        const data = res.data
        if (data.success) {
            dispatch({ type: GLOBAL_TYPES.PROFILE_USER, payload: { ...profile_user, user: data.user } })
            dispatch({ type: GLOBAL_TYPES.AUTH, payload: { ...auth, user: data.user } })
        } else {
            alert(data.message)
        }
        dispatch({ type: GLOBAL_TYPES.LOADING, payload: false })
    }
}