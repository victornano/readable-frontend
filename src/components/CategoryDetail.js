import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import AddIcon from 'react-icons/lib/fa/plus-square'

class CategoryDetail extends Component {
    state = {  }
    render() {
        const currentCategory = this.props.categories.find(category => category.path === this.props.match.params.id)
        return (
            <div>
                {currentCategory && (
                    <div>
                        <Menu />
                        <h1>{currentCategory.name}</h1>
                        <PostList posts={this.props.posts.filter(post => post.category === currentCategory.path)} />
                        <Link to="/posts/add"><span>Add a New Post</span> <AddIcon size="20" /></Link>
                    </div>
                )}
            </div>
        )
    }
}
function mapStateToProps ({ posts, categories }) {
    return { posts, categories }
}

export default connect(mapStateToProps)(CategoryDetail)
