import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../store/Todos/reducers'
import { toggleTodo } from '../store/Todos/actions'

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter || 'all')
})

const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList))

export default VisibleTodoList
