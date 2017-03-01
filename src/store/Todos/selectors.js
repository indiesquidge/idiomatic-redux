export const getTodo = (state, id) => state[id]

export const getIds = (state) => state

export const getVisibleTodos = (state, filter) => {
  const ids = getIds(state.listByFilter[filter])
  return ids.map(id => getTodo(state.byId, id))
}
