import todoApp from './Todos/reducers'
import { createStore } from 'redux'

const store = createStore(todoApp)

export default store
