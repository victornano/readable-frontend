import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { fetchCategories} from "./actions/categories"
import { fetchPosts} from "./actions/posts"
import { fetchComments} from "./actions/comments"
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
store.dispatch(fetchCategories())
store.dispatch(fetchPosts())
store.dispatch(fetchComments())

ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
