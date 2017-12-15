import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import PostList from './PostList'
import { Link } from 'react-router-dom'
import AddIcon from 'react-icons/lib/fa/plus-square'

class Dashboard extends Component {
    state = {  }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <CategoryList />
                <PostList posts={this.props.posts} />
                <Link to="/posts/add"><span>Add a New Post</span> <AddIcon size="20" /></Link>
            </div>
        )
    }
}
function mapStateToProps ({ posts }) {
    return { posts }
}

export default connect(mapStateToProps)(Dashboard)
