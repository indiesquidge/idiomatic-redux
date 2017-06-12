## Implementing Redux Store from Scratch

```javascript
// const { createStore } = Redux

const createStore = reducer => {
  let state
  let listeners = []

  const getState = () => state

  // Dispatching an action is the only way to change the internal state
  const dispatch = action => {
    // In order to calculate the new state, we call the reducer
    // with the current // state and the action being dispatched
    state = reducer(state, action)
    // After the state is updated, we need to notify every listener
    listeners.forEach(listener => listener())
  }

  // Return unsubscribe method that removes a listener from the listeners array
  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  // Return dummy action to populate store with initial state
  dispatch({})

  return {
    getState,
    dispatch,
    subscribe
  }
}
```

## Implementing Redux combineReducers from Scratch

```javascript
// const { combineReducers } = Redux

const combineReducers = reducers => {
  return (state = {}, action) => {
    // Retrieve all keys of passed in reducers object
    // Use the reduce method over the keys to fill the next state gradually
    return Object.keys(reducers).reduce((nextState, key) => {
      // Calculate next state for a given key by calling the corresponding
      // reducer function, passing only a slice of the overall state; save the
      // result in the next state by the same key
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}
```
