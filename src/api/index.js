import { v4 } from 'node-uuid'

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: 'hey',
      completed: true
    },
    {
      id: v4(),
      text: 'ho',
      completed: true
    },
    {
      id: v4(),
      text: 'let’s go',
      completed: false
    }
  ]
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const addTodo = (text) =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false
    }
    fakeDatabase.todos.push(todo)
    return todo
  })

export const toggleTodo = (id) =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    return todo
  })

export const fetchTodos = (filter) => {
  return delay(500).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Boom!')
    // }
    switch (filter) {
      case 'all':
        return fakeDatabase.todos
      case 'completed':
        return fakeDatabase.todos.filter(todo => todo.completed)
      case 'active':
        return fakeDatabase.todos.filter(todo => !todo.completed)
      default:
        throw new Error(`Unkown filter: ${filter}.`)
    }
  })
}
