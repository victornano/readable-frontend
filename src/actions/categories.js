import * as ReadableApi from '../ReadableApi'
import {RECEIVE_CATEGORIES} from '../actions/types'

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    ReadableApi.getCategories()
        .then(data => dispatch(receiveCategories(data.categories)))
)