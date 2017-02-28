import { createStore } from 'redux'

import todos from './Todos/reducers'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch
  if (!console.group) {
    return rawDispatch
  }

  return (action) => {
    console.group(action.type)
    console.log('%c prev state', 'color: grey', store.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch

  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch)
    }
    return rawDispatch(action)
  }
}

const configureStore = () => {
  const store = createStore(todos)

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  store.dispatch = addPromiseSupportToDispatch(store)

  return store
}

export default configureStore
