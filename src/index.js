import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import throttle from 'lodash/throttle'

import TodoApp from './components/TodoApp'
import todoApp from './store/Todos/reducers'
import { loadState, saveState } from './store/localStorage'

const persistedState = loadState()

const store = createStore(todoApp, persistedState)

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  })
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
