import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import todos from './Todos/reducers'
import * as api from '../api'

const configureStore = () => {
  let middlewares = [thunk.withExtraArgument(api)]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  return createStore(
    todos,
    applyMiddleware(...middlewares)
  )
}

export default configureStore
