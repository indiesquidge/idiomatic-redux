import React from 'react'
import { connect } from 'react-redux'

import { addTodo } from '../store/Todos/actions'

/*
 * This cannot currently be classified as a presentation or container comonent.
 * The input and the button the presentation part, but dispatching an action on
 * click is the behavior, which is generally specified by the container.
 *
 * It seems okay to keep this component as a hybrid for the time being since
 * there isn't any state, the UI is simple, and it's hard to imagine any other
 * behavior other than the dispatch on click.
*/

let AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <input type='text' ref={node => { input = node }} />
      <button onClick={() => {
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}

AddTodo = connect()(AddTodo)

export default AddTodo
