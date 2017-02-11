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

### Recommended Patterns

*Container Components* - React components concerned with connecting the Redux
store to the presentation components and specify the data and behavior that it
needs

*Presentation Components* - React components only concerned with how things look
or how they render

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
