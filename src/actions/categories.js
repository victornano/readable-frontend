import * as ReadableApi from '../ReadableApi'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    ReadableApi.getCategories()
        .then(data => dispatch(receiveCategories(data.categories)))
)