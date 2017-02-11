import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import todoApp from './store/Todos/reducers'

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

class Provider extends React.Component {
  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return this.props.children
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
