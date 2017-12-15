import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { votePost } from '../actions/posts'
import sortBy from 'sort-by'
import Moment from 'react-moment'
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
        const {posts, sendPostVote} = this.props
        return (
            <section>
                <h2>Posts</h2>
                <select value={this.state.order} onChange={this.selectOrder}>
                    <option value="-timestamp">Most Recent</option>
                    <option value="-voteScore">Popular</option>
                </select>
                <ul>
                    { posts.sort(sortBy(this.state.order)).map(post => (
                        <li key={post.id}><Link to={`/${post.category}/${post.id}`}>{post.title}</Link> | <Moment format="MMM Do YY" unix>{post.timestamp / 1000}</Moment> | <strong>Score:</strong> {post.voteScore} <button className="icon-btn" onClick={() => sendPostVote(post, true)}><UpVoteIcon size={16}/></button> <button className="icon-btn" onClick={() => sendPostVote(post)} ><DownVoteIcon size={16}/></button></li>
                    ))}
                </ul>
            </section>
        )
  }
}

function mapDispatchToProps (dispatch) {
    return {
      sendPostVote: (post, isUpVote) => dispatch(votePost(post, isUpVote))
    }
}

export default connect(null, mapDispatchToProps)(PostList)