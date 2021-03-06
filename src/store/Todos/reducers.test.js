import todoApp from './reducers'

describe('todos reducer', () => {
  it('can add a todo', () => {
    const stateBefore = {}
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
    }
    const stateAfter = {
      todos: [{
        id: 0,
        text: 'Learn Redux',
        completed: false
      }]
    }
    expect(todoApp(stateBefore, action)).toEqual(stateAfter)
  })

  it('can toggle a todo', () => {
    const stateBefore = {
      todos: [
        {
          id: 0,
          text: 'Learn Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Learn React',
          completed: false
        }
      ]
    }
    const action = {
      type: 'TOGGLE_TODO',
      id: 1
    }
    const stateAfter = {
      todos: [
        {
          id: 0,
          text: 'Learn Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Learn React',
          completed: true
        }
      ]
    }

    expect(todoApp(stateBefore, action)).toEqual(stateAfter)
  })
})
