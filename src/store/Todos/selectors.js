import * as fromTodos from './reducers'

export const getVisibleTodos = (state, filter) => {
  const ids = fromTodos.getIds(state.listByFilter[filter])
  return ids.map(id => fromTodos.getTodo(state.byId, id))
}

export const getIsFetching = (state, filter) => {
  return fromTodos.getIsFetching(state.listByFilter[filter])
}

export const getErrorMessage = (state, filter) => {
  return fromTodos.getErrorMessage(state.listByFilter[filter])
}
