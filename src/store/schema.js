import { schema } from 'normalizr'

export const todoSchema = new schema.Entity('todos')
export const todoListSchema = [todoSchema]
