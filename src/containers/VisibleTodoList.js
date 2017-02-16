import { connect } from 'react-redux'

import TodoList from '../components/TodoList'

import { toggleTodo } from '../store/Todos/actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(todo => todo.completed)
    case 'active':
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter)
})

const mapDispatchToProps = (dispatch) => ({
  onTodoClick (id) {
    dispatch(toggleTodo(id))
  }
})

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default VisibleTodoList
