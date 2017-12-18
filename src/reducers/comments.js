import {RECEIVE_COMMENTS, RECEIVE_VOTE_COMMENT, RECEIVE_ADD_COMMENT, RECEIVE_EDIT_COMMENT, RECEIVE_DELETE_COMMENT} from '../actions/types'

const posts = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_VOTE_COMMENT:
            action.comment.voteScore = action.isUpVote ? action.comment.voteScore + 1 : action.comment.voteScore - 1
            return state.map(comment => {
                return comment.id === action.comment.id ? action.comment : comment
            })
        case RECEIVE_EDIT_COMMENT:
            return state.map(comment => {
                return comment.id === action.comment.id ? action.comment : comment
            })
        case RECEIVE_ADD_COMMENT:
            return [
                ...state,
                action.comment
            ]
        case RECEIVE_DELETE_COMMENT:
            return state.filter(comment => comment.id !== action.id)
        case RECEIVE_COMMENTS:
            return action.comments
        default :
            return state
    }
}
export default posts