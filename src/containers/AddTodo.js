import React from 'react'

/*
 * This cannot currently be classified as a presentation or container comonent.
 * The input and the button the presentation part, but dispatching an action on
 * click is the behavior, which is generally specified by the container.
 *
 * It seems okay to keep this component as a hybrid for the time being since
 * there isn't any state, the UI is simple, and it's hard to imagine any other
 * behavior other than the dispatch on click.
*/

let nextTodoId = 0
const AddTodo = (props, { store }) => {
  let input
  return (
    <div>
      <input type='text' ref={node => { input = node }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}

AddTodo.contextTypes = {
  store: React.PropTypes.object
}

export default AddTodo
