import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addPost, editPost } from '../actions/posts'

import BackIcon from 'react-icons/lib/fa/angle-left'


class PostForm extends Component {
    state = {}
    onFormSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        if (id) {
            this.props.sendEditPost(id, this.titleInput.value, this.bodyInput.value)
        }
        else {
            this.props.sendAddPost({
                id: Math.random().toString(36).substr(2, 9),
                title: this.titleInput.value,
                timestamp: Date.now(),
                body: this.bodyInput.value,
                author: this.authorInput.value,
                category: this.categoryInput.value
            })
        }
        this.props.history.push('/')
    }
    render() {
        const currentPost = this.props.post
        return (
            <div>
                {(!this.props.match.params.id || currentPost) && (
                    <div>
                        <Link to="/"><BackIcon size="20" /><span>Back to Home</span></Link>
                        <h1>{currentPost ? 'Edit' : 'Add'} Post</h1>
                        <form className="pure-form pure-form-stacked" onSubmit={this.onFormSubmit}>
                            <fieldset>
                                <legend></legend>
                                <label htmlFor="title">Title:</label>
                                <input id="title" type="text" className="pure-input-2-3" ref={(input) => this.titleInput = input} defaultValue={currentPost && currentPost.title} />
                                <label htmlFor="body">Body:</label>
                                <textarea id="body" rows="5" cols="50" className="pure-input-2-3" ref={(input) => this.bodyInput = input} defaultValue={currentPost && currentPost.body} ></textarea>
                                {!currentPost && (
                                    <div>
                                        <label htmlFor="author">Author:</label>
                                        <input id="author" type="text" className="pure-input-2-3" ref={(input) => this.authorInput = input}/>
                                        <label htmlFor="category">Category:</label>
                                        <select id="category" ref={(input) => this.categoryInput = input}>
                                            <option key="default" value="" >Select Category</option>
                                            {this.props.categories.map( category => (
                                                <option key={category.path} value={category.path} >{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <button type="submit" className="pure-button pure-button-primary">Submit</button>
                            </fieldset>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}
function mapStateToProps ({ posts, categories }, ownProps) {
    return {
        post: posts.find(post => post.id === ownProps.match.params.id),
        categories
    }
}
function mapDispatchToProps (dispatch) {
    return {
        sendEditPost: (id, title, body) => dispatch(editPost(id, title, body)),
        sendAddPost: (post) => dispatch(addPost(post)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
