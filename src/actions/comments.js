import * as ReadableApi from '../ReadableApi'
import {RECEIVE_COMMENTS, RECEIVE_VOTE_COMMENT, RECEIVE_ADD_COMMENT, RECEIVE_EDIT_COMMENT, RECEIVE_DELETE_COMMENT} from '../actions/types'

// Get Comments
export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
})
export const fetchComments = () => dispatch => (
    ReadableApi.getPosts()
        .then(posts => {
            const requests = posts.map(post => ReadableApi.getPostComments(post.id))
            return Promise.all(requests)
                .then(responses => {
                    return dispatch(receiveComments([].concat.apply([], responses)))
                })
        })
)

// Vote Post
export const receiveVoteComment = (comment, isUpVote) => ({
    type: RECEIVE_VOTE_COMMENT,
    comment,
    isUpVote
})
export const voteComment = (comment, isUpVote) => dispatch => (
    ReadableApi.voteComment(comment.id, isUpVote)
        .then(data => dispatch(receiveVoteComment(comment, isUpVote)))
)

// Edit comment
export const receiveEditComment = (comment, isUpVote) => ({
    type: RECEIVE_EDIT_COMMENT,
    comment
})
export const editComment = (id, timestamp, body) => dispatch => (
    ReadableApi.editComment(id, timestamp, body)
        .then(comment => dispatch(receiveEditComment(comment)))
)

// Add comment
export const receiveAddComment = (comment, isUpVote) => ({
    type: RECEIVE_ADD_COMMENT,
    comment
})
export const addComment = (newComment) => dispatch => (
    ReadableApi.addComment(newComment)
        .then(comment => dispatch(receiveAddComment(comment)))
)

// Delete comment
export const receiveDeleteComment = (id) => ({
    type: RECEIVE_DELETE_COMMENT,
    id
})
export const deleteComment = (id) => dispatch => (
    ReadableApi.deleteComment(id)
        .then(data => dispatch(receiveDeleteComment(id)))
)