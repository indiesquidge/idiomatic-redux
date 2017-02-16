import React from 'react'

import VisibleTodoList from '../containers/VisibleTodoList'
import AddTodo from '../containers/AddTodo'
import Footer from './Footer'

const TodoApp = ({ match }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={match.params.filter || 'all'} />
    <Footer />
  </div>
)

export default TodoApp
