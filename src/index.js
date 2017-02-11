import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import todoApp from './store/Todos/reducers'
import { createStore } from 'redux'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

const store = createStore(todoApp)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
}

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  return filter === currentFilter ? (
    <span>{children}</span>
  ) : (
    <a href='#' onClick={e => {
      e.preventDefault()
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      })
    }}>
      {children}
    </a>
  )
}

let nextTodoId = 0

class TodoApp extends Component {
  render () {
    const { todos, visibilityFilter } = this.props
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)

    return (
      <div>
        <AddTodo onAddClick={text => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text
          })
        }} />
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          }
        />
        <p>
          Show:
          {' '}
          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>
            All
          </FilterLink>
          {' '}
          <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>
            Active
          </FilterLink>
          {' '}
          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  )
}

store.subscribe(render)
render()
