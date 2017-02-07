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
      }],
      visibilityFilter: 'SHOW_ALL'
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
      ],
      visibilityFilter: 'SHOW_ALL'
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
      ],
      visibilityFilter: 'SHOW_ALL'
    }

    expect(todoApp(stateBefore, action)).toEqual(stateAfter)
  })

  it('can set a visibility filter on a todo', () => {
    const stateBefore = {
      todos: [],
      visibilityFilter: 'SHOW_ALL'
    }
    const action = {
      type: 'SET_VISIBILITY_FILTER',
      filter: 'SHOW_COMPLETED'
    }
    const stateAfter = {
      todos: [],
      visibilityFilter: 'SHOW_COMPLETED'
    }

    expect(todoApp(stateBefore, action)).toEqual(stateAfter)
  })
})
