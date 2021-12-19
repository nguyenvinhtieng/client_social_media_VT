import { postMethod, getMethod, putMethod, deleteMethod } from '../../utils/fetchData'
import { GLOBAL_TYPES } from './constants'
import showToast from "../../utils/showToast";

export const userPost = (post) => {
    return async (dispatch, getState) => {
        const { posts } = getState()
        dispatch({ type: GLOBAL_TYPES.LOADING, payload: true })
        let res = await postMethod('posts', post)
        let data = res.data
        if (data.success) {
            dispatch({ type: GLOBAL_TYPES.LOADING, payload: false })
            dispatch({ type: GLOBAL_TYPES.POST, payload: [data.post, ...posts] })
            showToast("success", data.message)
        } else {
            showToast("error", data.message)
        }
    }
}

export const getPosts = (page = 0) => {
    return async (dispatch, getState) => {
        let { posts } = getState()
        // console.log(`posts?page=${page}`)
        let res = await getMethod(`posts?page=${page}`)
        let data = res.data
        // console.log(data)
        // console.group("Post")
        // console.log(posts)
        // console.groupEnd("Post")
        if (data.success) {
            // console.group("New Post")
            // let newPost = [...posts, ...data.posts]
            // console.log(newPost)
            // console.groupEnd("New Post")

            dispatch({
                type: GLOBAL_TYPES.POST,
                payload: [...posts, ...data.posts]
            })
            // showToast("success", data.message)
        } else {
            // showToast("error", data.message)
        }
    }
}

export const deletePost = (post_id) => {
    return async (dispatch, getState) => {
        let { posts, profile_user } = getState()
        let res = await deleteMethod(`posts/${post_id}`)
        if (res.data.success) {
            let newPostHome = posts.filter(post => post._id !== post_id)
            if (profile_user.posts.length > 0) {
                let newPostProfile = profile_user.posts.filter(post => post._id !== post_id)
                dispatch({
                    type: GLOBAL_TYPES.PROFILE_USER,
                    payload: { ...profile_user, posts: newPostProfile }
                })
            }
            dispatch({ type: GLOBAL_TYPES.POST, payload: newPostHome })
            showToast("success", res.data.message)
        } else {
            showToast("error", res.data.message)
        }
    }
}

export const addComment = (comment) => {
    return async (dispatch, getState) => {
        let { posts, profile_user } = getState()
        let res = await postMethod('comments', comment)
        let data = res.data
        if (data.success) {
            let newPosts = posts.map(post => {
                if (post._id === comment.post_id) {
                    return { ...post, comments: [data.comment, ...post.comments] }
                } else {
                    return post
                }
            })
            if (profile_user.posts.length > 0) {
                let newPostsProfile = profile_user.posts.map(post => {
                    if (post._id === comment.post_id) {
                        return { ...post, comments: [data.comment, ...post.comments] }
                    } else {
                        return post
                    }
                })
                dispatch({
                    type: GLOBAL_TYPES.PROFILE_USER,
                    payload: { ...profile_user, posts: newPostsProfile }
                })
            }

            dispatch({
                type: GLOBAL_TYPES.POST,
                payload: newPosts
            })

        } else {
            showToast("error", res.data.message)
        }
    }
}
export const editComment = (data) => {
    return async (dispatch, getState) => {
        let { posts, profile_user } = getState()
        let res = await putMethod('comments', data)
        if (res.data.success) {
            let newPostHome = posts.map(post => {
                if (post._id === data.post_id) {
                    post.comments.forEach(comment => {
                        if (comment._id === data.comment_id)
                            comment.content = res.data.comment.content
                    })
                }
                return post
            })
            if (profile_user.posts.length > 0) {
                let newPostProfile = profile_user?.posts.map(post => {
                    if (post._id === data.post_id) {
                        post.comments.forEach(comment => {
                            if (comment._id === data.comment_id) {
                                comment.content = res.data.comment.content
                            }
                        })
                    }
                    return post
                })
                dispatch({ type: GLOBAL_TYPES.PROFILE_USER, payload: { ...profile_user, posts: newPostProfile } })
            }
            dispatch({ type: GLOBAL_TYPES.POST, payload: newPostHome })
            showToast("success", res.data.message)
        } else {
            showToast("error", res.data.message)
        }
    }
}

export const deleteComment = (data) => {
    return async (dispatch, getState) => {
        let { posts, profile_user } = getState()
        let res = await postMethod("comments/delete-comment", data)
        if (res.data.success) {
            let newPostHome = posts.map(post => {
                if (post._id === data.post_id) {
                    post.comments = post.comments.filter(comment => comment._id !== data.comment_id)
                }
                return post
            })
            if (profile_user.posts.length > 0) {
                let newPostProfile = profile_user.posts.map(post => {
                    if (post._id === data.post_id) {
                        post.comments = post.comments.filter(comment => comment._id !== data.comment_id)
                    }
                    return post
                })
                dispatch({
                    type: GLOBAL_TYPES.PROFILE_USER,
                    payload: { ...profile_user, posts: [...newPostProfile] }
                })
            }
            showToast("success", res.data.message)
            dispatch({ type: GLOBAL_TYPES.POST, payload: [...newPostHome] })
        } else {
            showToast("error", res.data.message)
        }

    }
}
