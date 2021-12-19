import { GLOBAL_TYPES } from '../actions/constants'
const initialState = []
// {
//     comments: [],
//     content: "abc",
//     createdAt: "2021-12-17T07:32:09.768Z",
//     id_user: "61babd93d0fa8618b884821c",
//     images: [],
//     img_user: "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg",
//     name_user: "Nguyễn Vinh Tiếng",
//     slug_user: "nguyen-vinh-tieng",
//     updatedAt: "2021-12-17T07:32:09.768Z",
//     youtubeLink: "",
//     __v: 0,
//     _id: "61bc3cf90320fbc4aa137b53"
// }
function postReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.POST:
            return action.payload
        default:
            return state
    }
}
export default postReducer;
