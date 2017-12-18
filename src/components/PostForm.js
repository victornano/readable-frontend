import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, editPost } from '../actions/posts'
import Menu from './Menu'

class PostForm extends Component {
    state = {
        formValid: true
    }
    onFormSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        let valid = true
        if (id) {
            if (this.titleInput.value) {
                this.props.sendEditPost(id, this.titleInput.value, this.bodyInput.value)
            }
            else {
                this.setState({formValid: false})
                valid = false
            }
        }
        else {
            if (this.titleInput.value && this.categoryInput.value) {
                this.props.sendAddPost({
                    id: Math.random().toString(36).substr(2, 9),
                    title: this.titleInput.value,
                    timestamp: Date.now(),
                    body: this.bodyInput.value,
                    author: this.authorInput.value,
                    category: this.categoryInput.value
                })
            }
            else {
                this.setState({formValid: false})
                valid = false
            }

        }
        if (valid) {
            this.props.history.push('/')
        }
    }
    render() {
        const { currentPost } = this.props
        return (
            <div>
                {(!this.props.match.params.id || currentPost) && (
                    <div>
                        <Menu />
                        <h1>{currentPost ? 'Edit' : 'Add'} Post</h1>
                        <form className="pure-form pure-form-stacked" onSubmit={this.onFormSubmit}>
                            <fieldset>
                                <legend></legend>
                                <label htmlFor="title">Title <small>(*required)</small>:</label>
                                <input id="title" type="text" className="pure-input-2-3" ref={(input) => this.titleInput = input} defaultValue={currentPost && currentPost.title} />
                                <label htmlFor="body">Body:</label>
                                <textarea id="body" rows="5" cols="50" className="pure-input-2-3" ref={(input) => this.bodyInput = input} defaultValue={currentPost && currentPost.body} ></textarea>
                                {!currentPost && (
                                    <div>
                                        <label htmlFor="author">Author:</label>
                                        <input id="author" type="text" className="pure-input-2-3" ref={(input) => this.authorInput = input}/>
                                        <label htmlFor="category">Category <small>(*required)</small>:</label>
                                        <select id="category" ref={(input) => this.categoryInput = input}>
                                            <option key="default" value="" >Select Category</option>
                                            {this.props.categories.map( category => (
                                                <option key={category.path} value={category.path} >{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {!this.state.formValid && (<label className="error">Please enter the required values.</label>)}
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
        currentPost: posts.find(post => post.id === ownProps.match.params.id),
        categories
    }
}
function mapDispatchToProps (dispatch) {
    return {
        sendEditPost: (id, title, body) => dispatch(editPost(id, title, body)),
        sendAddPost: (post) => dispatch(addPost(post))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
