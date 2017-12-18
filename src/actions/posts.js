import * as ReadableApi from '../ReadableApi'
import {RECEIVE_POSTS, RECEIVE_VOTE_POST, RECEIVE_ADD_POST, RECEIVE_EDIT_POST, RECEIVE_DELETE_POST} from '../actions/types'

// Get Posts
export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})
export const fetchPosts = () => dispatch => (
    ReadableApi.getPosts()
        .then(posts => dispatch(receivePosts(posts)))
)

// Vote Post
export const receiveVotePost = (post, isUpVote) => ({
    type: RECEIVE_VOTE_POST,
    post,
    isUpVote
})
export const votePost = (post, isUpVote) => dispatch => (
    ReadableApi.votePost(post.id, isUpVote)
        .then(data => dispatch(receiveVotePost(post, isUpVote)))
)

// Edit Post
export const receiveEditPost = (post, isUpVote) => ({
    type: RECEIVE_EDIT_POST,
    post
})
export const editPost = (id, title, body) => dispatch => (
    ReadableApi.editPost(id, title, body)
        .then(post => dispatch(receiveEditPost(post)))
)

// Add Post
export const receiveAddPost = (post, isUpVote) => ({
    type: RECEIVE_ADD_POST,
    post
})
export const addPost = (newPost) => dispatch => (
    ReadableApi.addPost(newPost)
        .then(post => dispatch(receiveAddPost(post)))
)

// Delete Post
export const receiveDeletePost = (id) => ({
    type: RECEIVE_DELETE_POST,
    id
})
export const deletePost = (id) => dispatch => (
    ReadableApi.deletePost(id)
        .then(data => dispatch(receiveDeletePost(id)))
)