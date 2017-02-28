import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../store/Todos/reducers'
import * as actions from '../store/Todos/actions'
import { fetchTodos } from '../api'

let VisibleTodoList = class VisibleTodoList extends Component {
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData () {
    const { filter, receiveTodos } = this.props
    fetchTodos(filter)
      .then(todos => receiveTodos(filter, todos))
      .catch(error => console.error(error))
  }

  render () {
    const { toggleTodo, ...rest } = this.props
    return <TodoList {...rest} onTodoClick={toggleTodo} />
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
  actions
)(VisibleTodoList))

export default VisibleTodoList
