import { combineReducers } from 'redux'

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state }
      action.response.forEach(todo => {
        nextState[todo.id] = todo
      })
      return nextState
    default:
      return state
  }
}

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id)
      default:
        return state
    }
  }

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state
    }
    switch (action.type) {
      case 'REQUEST_TODOS':
        return true
      case 'RECEIVE_TODOS':
        return false
      default:
        return state
    }
  }

  return combineReducers({
    ids,
    isFetching
  })
}

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos = combineReducers({
  listByFilter,
  byId
})

export const getTodo = (state, id) => state[id]
export const getIds = (state) => state.ids
export const getIsFetching = (state) => state.isFetching

export default todos
