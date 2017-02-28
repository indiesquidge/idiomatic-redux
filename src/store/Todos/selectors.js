export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state
    case 'completed':
      return state.filter(todo => todo.completed)
    case 'active':
      return state.filter(todo => !todo.completed)
    default:
      throw new Error(`Unkown filter: ${filter}.`)
  }
}
