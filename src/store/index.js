import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

import todos from './Todos/reducers'

const configureStore = () => {
  let middlewares = [promise]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  return createStore(
    todos,
    applyMiddleware(...middlewares)
  )
}

export default configureStore
