export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter]
  return ids.map(id => state.byId[id])
}
