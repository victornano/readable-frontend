import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { deletePost } from '../actions/posts'
import { addComment, editComment, deleteComment, voteComment } from '../actions/comments'
import Menu from './Menu'
import NotFound from './NotFound'

import DeleteIcon from 'react-icons/lib/md/delete'
import EditIcon from 'react-icons/lib/fa/edit'
import UpVoteIcon from 'react-icons/lib/fa/thumbs-up'
import DownVoteIcon from 'react-icons/lib/fa/thumbs-down'

class PostDetail extends Component {
    state = {
        commentText: '',
        editComment: null
    }
    handleCommentChange = (e) => {
        this.setState({commentText: e.target.value})
    }
    onSubmitComment = (e) => {
        e.preventDefault()
        if (this.state.editComment){
            this.props.sendEditComment(this.state.editComment, Date.now(), this.state.commentText)
        }
        else {
            this.props.sendAddComment({
                id: Math.random().toString(36).substr(2, 9),
                parentId: this.props.match.params.id,
                timestamp: Date.now(),
                body: this.state.commentText,
                author: 'Anonymous'
            })
        }
        this.setState({
            commentText : '',
            editComment : null
        });
    }
    onEditComment = (comment) => {
        this.commentInput.focus()
        this.setState({editComment: comment.id, commentText: comment.body })
    }
    render() {
        const postId = this.props.match.params.id
        const currentPost = this.props.posts.find(post => post.id === postId)
        const {comments} = this.props
        const {editComment} = this.state
        return (
            <div>
                <Menu />
                {currentPost ? (
                    <div>
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
                                        <button className="icon-btn" onClick={() => this.onEditComment(comment)}><EditIcon size="16" /></button>
                                        <button className="icon-btn" onClick={() => this.props.sendDeleteComment(comment.id)}><DeleteIcon size="16" /></button>
                                        <button className="icon-btn" onClick={() => this.props.sendVoteComment(comment, true)}><UpVoteIcon size={16}/></button>
                                        <button className="icon-btn" onClick={() => this.props.sendVoteComment(comment)} ><DownVoteIcon size={16}/></button>
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
                ) : <NotFound />}
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        sendDeletePost: (id) => dispatch(deletePost(id)),
        sendAddComment: (comment) => dispatch(addComment(comment)),
        sendEditComment: (id, timestamp, body) => dispatch(editComment(id, timestamp, body)),
        sendDeleteComment: (id, body) => dispatch(deleteComment(id)),
        sendVoteComment: (comment, isUpVote) => dispatch(voteComment(comment, isUpVote))
    }
}
export default connect(({posts, comments}) => ({posts, comments}), mapDispatchToProps)(PostDetail)
