import { v4 } from 'node-uuid'

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
