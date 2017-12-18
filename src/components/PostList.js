import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { votePost, deletePost } from '../actions/posts'
import sortBy from 'sort-by'
import Moment from 'react-moment'

import DeleteIcon from 'react-icons/lib/md/delete'
import EditIcon from 'react-icons/lib/fa/edit'
import UpVoteIcon from 'react-icons/lib/fa/thumbs-up'
import DownVoteIcon from 'react-icons/lib/fa/thumbs-down'

class PostList extends Component {
    state = {
        order: '-timestamp'
    }
    selectOrder = (e) => {
        this.setState({
            order: e.target.value
        })
    }
    render() {
        const {posts, sendPostVote, sendDeletePost} = this.props
        return (
            <section>
                <h2>Posts</h2>
                <select value={this.state.order} onChange={this.selectOrder}>
                    <option value="-timestamp">Most Recent</option>
                    <option value="-voteScore">Popular</option>
                </select>
                <ul>
                    { posts.sort(sortBy(this.state.order)).map(post => (
                        <li key={post.id}>
                            <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to={`/posts/edit/${post.id}`}><EditIcon size="16" /></Link>&nbsp;
                            <button className="icon-btn delete-btn" onClick={() => sendDeletePost(post.id)}><DeleteIcon size="16" /></button>&nbsp;
                            <button className="icon-btn" onClick={() => sendPostVote(post, true)}><UpVoteIcon size={16}/></button>
                            <button className="icon-btn" onClick={() => sendPostVote(post)} ><DownVoteIcon size={16}/></button>
                            <div className="post-listing-details">
                                <Moment format="MMM Do YY" unix>{post.timestamp / 1000}</Moment>&nbsp;|&nbsp;
                                <strong>Author:</strong> {post.author}&nbsp;|&nbsp;
                                <strong>Score:</strong> {post.voteScore}&nbsp;|&nbsp;
                                {this.props.comments && (
                                    <span>
                                        <strong>Comments:</strong> {this.props.comments.filter(c => c.parentId === post.id).length}
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        )
  }
}

function mapDispatchToProps (dispatch) {
    return {
        sendDeletePost: (id) => dispatch(deletePost(id)),
        sendPostVote: (post, isUpVote) => dispatch(votePost(post, isUpVote))
    }
}

export default connect(({comments}) => ({comments}), mapDispatchToProps)(PostList)