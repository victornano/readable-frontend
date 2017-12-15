import {RECEIVE_POSTS, RECEIVE_VOTE_POST, RECEIVE_ADD_POST, RECEIVE_EDIT_POST, RECEIVE_DELETE_POST} from '../actions/posts'
const posts = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_VOTE_POST:
            action.post.voteScore = action.isUpVote ? action.post.voteScore + 1 : action.post.voteScore - 1
            return state.map(post => {
                return post.id === action.post.id ? action.post : post
            })
        case RECEIVE_EDIT_POST:
            return state.map(post => {
                return post.id === action.post.id ? action.post : post
            })
        case RECEIVE_ADD_POST:
            return [
                ...state,
                action.post
            ]
        case RECEIVE_DELETE_POST:
            return state.filter(post => post.id !== action.id)
        case RECEIVE_POSTS:
            return action.posts
        default :
            return state
    }
}
export default posts