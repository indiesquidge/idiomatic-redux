import React from 'react'
import ReactDOM from 'react-dom'

import store from './store/index'

import VisibleTodoList from './containers/VisibleTodoList'
import AddTodo from './containers/AddTodo'
import Footer from './components/Footer'

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
)
