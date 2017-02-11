import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import TodoApp from './components/TodoApp'
import todoApp from './store/Todos/reducers'
import { loadState, saveState } from './store/localStorage'

const persistedState = loadState()

const store = createStore(todoApp, persistedState)

store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  })
})

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
