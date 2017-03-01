import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import todos from './Todos/reducers'

const thunk = (store) => (next) => (action) =>
  (typeof action === 'function')
    ? action(store.dispatch, store.getState)
    : next(action)

const configureStore = () => {
  let middlewares = [thunk]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  return createStore(
    todos,
    applyMiddleware(...middlewares)
  )
}

export default configureStore
