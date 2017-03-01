import * as fromTodos from './reducers'

export const getVisibleTodos = (state, filter) => {
  const ids = getIds(state.listByFilter[filter])
  return ids.map(id => getTodo(state.byId, id))
}
