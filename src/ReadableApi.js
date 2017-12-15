
const api = "http://localhost:3001"
export const UP_VOTE = 'upVote'
export const DOWN_VOTE = 'downVote'

const headers = {
  'Accept': 'application/json',
  'Authorization': 'test'
}
// CATEGORIES

// Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.
export const getCategories = () =>
    fetch(`${api}/categories/`, { headers })
        .then(res => res.json())

// POSTS

// Get all of the posts. Useful for the main page when no category is selected.
export const getPosts = () =>
    fetch(`${api}/posts/`, { headers })
        .then(res => res.json())

// Get all of the posts for a particular category.
export const getCategoryPosts = (categoryId) =>
    fetch(`${api}/${categoryId}/posts`, { headers })
        .then(res => res.json())

// Get the details of a single post.
export const getPost = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())

// Add a new post.
export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())

// Used for voting on a post.
export const votePost = (id, isUpVote) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: isUpVote ? UP_VOTE : DOWN_VOTE })
    }).then(res => res.json())

// Edit the details of an existing post.
export const editPost = (id, title, body) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    }).then(res => res.json())

// Sets the deleted flag for a post to 'true'. Sets the parentDeleted flag for all child comments to 'true'.
export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())

// COMMENTS

// Get all the comments for a single post
export const getPostComments = (postId) =>
fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

// Get the details of a single comment.
export const getComment = (id) =>
fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())

// Add a comment to a post.
export const addComment = (comment) =>
fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
}).then(res => res.json())

// Used for voting on a comment.
export const voteComment = (id, isUpVote) =>
fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: isUpVote ? UP_VOTE : DOWN_VOTE })
}).then(res => res.json())

// Edit the details of an existing comment.
export const editComment = (id, timestamp, body) =>
fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
}).then(res => res.json())

// Sets the deleted flag for a comment to 'true'.
export const deleteComment = (id) =>
fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    }
}).then(res => res.json())