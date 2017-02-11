import { connect } from 'react-redux'

import TodoList from '../components/TodoList'

import { toggleTodo } from '../store/Todos/actions'

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

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => ({
  onTodoClick (id) {
    dispatch(toggleTodo(id))
  }
})

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default VisibleTodoList
