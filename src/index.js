import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import TodoApp from './components/TodoApp'
import todoApp from './store/Todos/reducers'

const persistedState = {
  todos: [{
    id: 0,
    text: 'Welcome Back!',
    completed: false
  }]
}

const store = createStore(todoApp, persistedState)

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
