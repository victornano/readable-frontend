import React, { Component } from 'react'
import { Route , Switch } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import CategoryDetail from './components/CategoryDetail'
import PostDetail from './components/PostDetail'
import PostForm from './components/PostForm'

import './App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/posts/edit/:id" component={PostForm} />
                    <Route path="/posts/add" component={PostForm} />
                    <Route path="/:categoryPath/:id" component={PostDetail} />
                    <Route path="/:id" component={CategoryDetail} />
                    <Route exact path="/" component={Dashboard} />
                </Switch>
            </div>
        )
    }
}
export default App
