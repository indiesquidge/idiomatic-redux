import { normalize } from 'normalizr'

import * as schema from '../schema'
import { getIsFetching } from './selectors'

export const fetchTodos = (filter) => (dispatch, getState, api) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  })

  return api.fetchTodos(filter).then(
      response => dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(response, schema.todoListSchema)
      }),
      error => dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.'
      })
    )
}

export const addTodo = (text) => (dispatch, getState, api) =>
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todoSchema)
    })
  })

export const toggleTodo = (id) => (dispatch, getState, api) =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todoSchema)
    })
  })
