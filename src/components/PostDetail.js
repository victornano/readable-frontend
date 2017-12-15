import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import * as ReadableApi from '../ReadableApi'
import { deletePost } from '../actions/posts'

import BackIcon from 'react-icons/lib/fa/angle-left'
import DeleteIcon from 'react-icons/lib/md/delete'
import EditIcon from 'react-icons/lib/fa/edit'
import UpVoteIcon from 'react-icons/lib/fa/thumbs-up'
import DownVoteIcon from 'react-icons/lib/fa/thumbs-down'

class PostDetail extends Component {
    state = {
        comments: [],
        commentText: '',
        editComment: null
    }
    handleCommentChange = (e) => {
        this.setState({commentText: e.target.value})
    }
    onSubmitComment = (e) => {
        e.preventDefault()
        if (this.state.editComment){
            ReadableApi.editComment(this.state.editComment, Date.now(), this.state.commentText)
            .then(comment => this.setState((state) => {
                state.comments = state.comments.map(c => {
                    if (c.id === comment.id){
                        c.body = comment.body
                        c.timestamp = comment.timestamp
                    }
                    return c
                })
                state.commentText = ''
                state.editComment = null
                return state
            }))
        }
        else {
            ReadableApi.addComment({
                id: Math.random().toString(36).substr(2, 9),
                parentId: this.props.match.params.id,
                timestamp: Date.now(),
                body: this.state.commentText,
                author: 'Anonymous'
            })
            .then(comment => this.setState((state) => {
                state.comments.push(comment)
                state.commentText = ''
                return state
            }))
        }
    }
    onDeleteComment = (comment) => {
        ReadableApi.deleteComment(comment.id)
        .then(data => this.setState((state) => {
            state.comments = state.comments.filter(c => c.id !== comment.id)
            return state
        }))
    }
    onVoteComment = (comment, isUpVote) => {
        ReadableApi.voteComment(comment.id, isUpVote)
        .then(data => this.setState((state) => {
            state.comments = state.comments.map(c => {
                if (c.id === comment.id){
                    c.voteScore = isUpVote ? c.voteScore + 1 : c.voteScore - 1
                }
                return c
            })
            return state
        }))
    }
    onEditComment = (comment) => {
        this.commentInput.focus()
        this.setState({editComment: comment.id, commentText: comment.body })
    }
    componentDidMount() {
        ReadableApi.getPostComments(this.props.match.params.id)
        .then(comments => this.setState({comments}))
    }
    render() {
        const postId = this.props.match.params.id
        const currentPost = this.props.posts.find(post => post.id === postId)
        const {comments, editComment} = this.state
        return (
            <div>
                {currentPost && (
                    <div>
                        <Link to="/"><BackIcon size="20" /><span>Back to Home</span></Link>
                        <h1>{currentPost.title}</h1>
                        <p><strong>Author:</strong> {currentPost.author} | <Moment format="MMM Do YY" unix>{currentPost.timestamp / 1000}</Moment> | <strong>Score:</strong> {currentPost.voteScore}</p>
                        <p>{currentPost.body}</p>
                        <p>
                            <Link to={`/posts/edit/${postId}`}><span>Edit Post</span> <EditIcon size="20" /></Link><br/><button className="icon-btn delete-btn" onClick={() => {
                                this.props.sendDeletePost(currentPost.id)
                                this.props.history.push('/')
                            }}><span>Delete Post</span> <DeleteIcon size="20" /></button>
                        </p>
                        <h2>Comments</h2>
                        {comments.length > 0 && (
                            <ul>
                                {comments.map(comment => (
                                    <li key={comment.id}>{comment.body}&nbsp;|&nbsp;
                                        <Moment format="MMM Do YY" unix>{comment.timestamp / 1000}</Moment>&nbsp;|&nbsp;
                                        <strong>Score:</strong> {comment.voteScore}&nbsp;
                                        <button className="icon-btn" onClick={() => this.onVoteComment(comment, true)}><UpVoteIcon size={16}/></button>
                                        <button className="icon-btn" onClick={() => this.onVoteComment(comment)} ><DownVoteIcon size={16}/></button>
                                        <button className="icon-btn" onClick={() => this.onEditComment(comment)}><EditIcon size="20" /></button>
                                        <button className="icon-btn" onClick={() => this.onDeleteComment(comment)}><DeleteIcon size="20" /></button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <form className="pure-form pure-form-stacked" onSubmit={this.onSubmitComment}>
                            <fieldset>
                                <legend>{editComment ? 'Edit' : 'Add'} comment</legend>
                                <textarea ref={(input) => { this.commentInput = input }} rows="5" cols="50" onChange={this.handleCommentChange} value={this.state.commentText} ></textarea>
                                <button type="submit" className="pure-button pure-button-primary">Submit Comment</button>
                            </fieldset>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}
function mapStateToProps ({ posts }) {
    return { posts }
}
function mapDispatchToProps (dispatch) {
    return {
        sendDeletePost: (id) => dispatch(deletePost(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
