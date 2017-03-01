# Learn Redux

### Three Principles of Redux

1. The whole state of your application, including the data and the UI state, is
contained in a single immutable JavaScript object, known as the State Tree

2. The State Tree is read only - you cannot modify or write to it. The only way to
change the State Tree is to dispatch an *action*

3. State mutations in your application need to be described as pure functions
(known as *reducers*) that take the previous state and the *action* being
dispatched and return the new state

### Terms:

*state*: Any - minimal representation of data in your app

*action*: Object - minimal representation of the change to the app's data; at
the very least, this object must contain a `type` property (preferred as string)
to specify the change

*reducer*: (Pure) Function - pure function responsible for implementing the
update logic of the application; it should declare how the next *state* is
calculated based on the current *state* and the *action* being dispatched

*store*: Object - binds together the Three Principles of Redux: holds the
current application *state* object, let's you dispatch actions, and when you
create it, you need to specify the *reducer* that tells how state is updated
with actions

*view* - the UI layer of this pattern, usually React

### Reducer Composition

A common pattern used in Redux that has different *reducers* specify how
different parts of the *state* tree are updated in response to *acitons*.
*Reducers* are normal JavaScript functions, so they can call other *reducers*
to delegate and abstract away handling of updates of some parts of the *state*
they manage. The updates are then combined into one larger state object.

This is a pervasive pattern in Redux development, and can be applied many times,
and while there is still a single top-level *reducer* managing the state of the
application, it is convenient to express it as many *reducers* calling each
other, each contributing to a part of the *state* tree.

This pattern is so common that Redux exports a `combineReducers` function who's
signature will take a single object argument—which is a mapping between the
*state* field names and the *reducers* managing them—and will return the top
level *reducer* function.

> It is a useful convention to always name your *reducers* after the *state*
> keys they manage.

Reducer Composition helps scale Redux development because different people on
the team can work on different *reducers*, handling the same actions, without
running into each other and causing merge conflicts.

### Redux Store

The *store* has three important methods:

1. `getState()` - retrieves current *state* of the Redux *store*

2. `dispatch(action: Object)` - let's you call actions to change the *state*

3. `subscribe(callback: Function)` - let's you register a callback that the *store*
will call anytime an *action* has been dispatched, allowing you to update your
UI to reflect the current application state

Any *state* change is caused by a `store.dispatch()` call somewhere in a React
component. When an *action* is dispatched, the *store* calls the *reducer* it
was created with, passing the current *state* and the *action* being dispatched.

If subscribed to the *store*, the ReactDOM `render` function is called anytime
the *store* state changes, so passing the current state of the *store* as a prop
(with `store.getState()`) is safe and will keep the UI up-to-date with the state.

Upon initial creation, Redux will let you pass some persisted or initial state
as the second argument to `createStore()`. This will override the initial state
values specified by the *reducers*. Essentially, whatever you pass pass to
`createStore` as the second argument will end up in the root *reducer* as the
*state* argument, instead of `undefined`.

You can also pass in an "enhancer" argument as the final argument to `createStore()`.
Most of the time, Redux's `applyMiddleware` function is passed in as the
"enhancer". If you want to include some persisted state, you need to do this
before the enhancer, but you can skip the persisted state if you don't have it.

### Redux Middleware

The purpose of Redux middlewares is to replace the single `dispatch()` function
with a chain of composable dispatch functions which each can do something with
an *action*. Middleware is a powerful system that lets us put custom behavior on
*actions* before they reach the *reducers*. This can be useful for logging,
analytics, error handling, asynchronous control flow, and more. Adding
middleware is supported out of the box with Redux through the `applyMiddleware`
named export.

All Redux middlewares have the same function signature, accepting the *store*,
the next dispatch function, and the *action* as curried arguments

```javascript
const someMiddleware = (store) => (next) => (action) => newDispatchFunction
```

The most common way to write asynchronous *action creators* is to use something
called "thunks", which are *action creators* who's return value is a function.
Usually this function takes dispatch as it's argument so that it can dispatch
multiple times throughout an async operation.

"Thunk middleware" is a powerful composable way to express async *action
creators* that want to emit several actions during the course of an async
operation. This is useful when you want to let a component specify the intention
to start an async operation without worrying which actions get dispatched and
when.

### Useful Conventions

- If a *reducer* receives an unknown *action*, it should return the current *state*.
- If a *reducer* receives an undefined *state*, it should return the current *state*.
- Name your *reducers* after the *state* keys they manage.
- All *reducers* should take in two arguments: the current state, and an action,
    even if the *reducer* does not make use of the *state* passed in.
- Prefer to keep the data that a UI component needs for rendering explicit (e.g.
    instead of passing a `todo` object to a `<Todo />` component, pass the `todo`
    object properties as separate props)
- First try and extract presentation components. If there is too much boilerplate
    passing the props to them through intermediate components, create container
    components around the presentation components, load the data, and specify the
    behavior.
- The *reducer* function should be the default export of a reducer file, but any
    *selector* functions should be named exports.

### Recommended Patterns

*Container Components* - React components concerned with connecting the Redux
store to the presentation components and specify the data and behavior that it
needs

*Presentation Components* - React components only concerned with how things look
or how they render

*Action Creators* - takes arguments about the action and returns an action
object with the type and necessary properties set. While actions objects could
be dispatched inline, using abstracted functions to encapsulate the action types
helps document what kinds of actions can be dispatched without worrying about
the action's internal structure.

*Selectors* - functions (usually prefixed with `get`) used to encapsulate the
knowledge about the *state* shape so that the components don't have to rely on
it; so named because they "select" something from the state and use it to
prepare data to be displayed by the UI.

Redux does not enforce that you encapsulate the knowledge about the state shape
in particular *selectors*. However, it's a nice pattern because it lets you
change the *state* that is stored by *reducers* without having to change your
components or your tests (if you use *selectors* and *reducers* together in your
tests).

When handling promise errors, it is usually best practice to use `catch` in the
promise chain. The downside of this approach is if one of your reducers or
subscribe components throws while handling an action, you'll get into the
`catch` block and display an internal error message to the user. To avoid this,
it is recommended that you don't use `catch` in this scenario and just pass the
second argument so it catches only the errors from the underlying API promise.

### Recommended Component Architecture:

Components do not need to know *how* a change will take place, all they know is
that they need to dispatch an *action* with at least a *type* property. (This
makes *actions* follow a declarative programming approach.)

The UI is most predictable when it is described as a pure function of the
application state. A goal of refactoring components is to make every component
as flexible as it is reasonable.

Separate components into categories that are based on how things look
(presentation components), and how they *act* (container components) so that
components can be as flexible as possible. This decouples your rendering from
Redux, so if you later decided to move your project to another framework (e.g.
Relay, MobX, etc.) you won't have to change all of your components, as you can
keep the presentational components exactly the same.

The downside of the approach is that it somewhat breaks the encapsulation
principle: you have to thread a lot of props through the components to get them
to the leaf presentation components, including the callbacks, even when the
intermediate components don't really use them. However, this problem can be
solved by introducing many intermediate container components.

Separating the container and presentation components is often a good idea, but
it should not be taken as a dogma. It should only be done when it truly reduces
the complexity of the codebase.

### React-Redux: React bindings for Redux

**Provider**: Component

Uses React's `context` to expose the store passed to it as a prop so that
container components can specify their `contextTypes` and use `this.context.store`
to subscribe to store updates and dispatch actions.

React `context` can be used to pass data through the component tree without
having to pass down props manually at every level. It creates a sort of wormhole
between the context provider component and the children/grandchildren components
who would like to opt-in to use `context`.

This is a pattern that should not be taken lightly, as it contradicts the React
philosophy of explicit date flow by essentially providing global variables across
the component tree. However, when used sparingly for dependency injection (like
passing the Redux store down through the component tree), it can be useful.

**connect**: (curried) function

All container components are very similar. They need to:

- re-render when the store state changes
- unsubscribe from the store when they unmount
- take the current state of the store and use it to render the presentation
    components with some props they calculate from the state of the store
- specify the `contextTypes` to get the store from the context

`connect` is a utility function that encapsulates and provides these
requirements by mapping the store state and desired actions to props. It is a
curried function call, and the second call argument is the presentation component
that is desired to be connected to the Redux store. The result of the `connect`
call is a new container component that will render the presentation component
passed in. It will calculate the props to pass to the presentation component by
merging the return object from `mapStateToProps`, `mapDispatchToProps`, and any
props explicitly provided on the container component itself.

```javascript
const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentationComponent)
```

It's a common pattern to inject just the `dispatch` function when creating
container components, and not subscribe to the store. If `mapStateToProps`
or `mapDispatchToProps` is 'falsy', `connect` will still give you `dispatch` as
a prop.

It's also a common pattern to use the container props when calculating the child
props for the presentation component. This is why  both `mapStateToProps` and
`mapDispatchToProps` can take props as an optional second argument.

### React-Router: declarative routing for React apps

**withRouter**: higher-order Component

Takes a React component as input, and returns a new React component injected
with router related props (e.g. `match`). This function will also pass any props
through itself, so any props passed by the app will be available on the returned
component. Handy when you need to read the current params somewhere deep in the
component tree. `withRouter` will re-render the component every time the route
changes. (Note that `withRouter` can only work with the `connect` function if
using `react-router` version 3+.)
