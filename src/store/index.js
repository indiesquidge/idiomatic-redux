import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import todos from './Todos/reducers'

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
