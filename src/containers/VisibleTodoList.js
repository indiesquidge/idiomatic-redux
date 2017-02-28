import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../store/Todos/reducers'
import { toggleTodo } from '../store/Todos/actions'
import { fetchTodos } from '../api'

class VisibleTodoList extends Component {
  componentDidMount () {
    fetchTodos(this.props.filter).then(todos => {
      console.log(todos)
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos => {
        console.log(todos)
      })
    }
  }

  render () {
    return <TodoList {...this.props} />
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(VisibleTodoList))

export default VisibleTodoList
