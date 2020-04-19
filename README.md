# react-redux-course-app

## Redux
## Custom Dev Environment
## Jest, Enzyme, React Testing Library

## Why Redux?
- Centralizes app state in a single store
    - Enforces keeping all state in single centralized object graph
    - Ease of understanding 
    - Eliminates complexity of handling multiple stores
    - Less likely to replicate data storage or req inadvertently
    - Isomorphic/Universal friendly
    - Immutable Store
        - Enhanced performance
        - Hot reloading 
        - Instant changes in browser w/o losing CS state
        - Time-travel debugging (replay interactions)
        - Small API
------------------------------------------------------------------------------------------
## Environment
- Custom dev environment
    - Compiles JSX, transpile JS, linting, generate index.html, reload on save
        - All in one command

### Production Dependencies

| **Dependency**   | **Use**                                              |
| ---------------- | ---------------------------------------------------- |
| bootstrap        | CSS Framework                                        |
| immer            | Helper for working with immutable data               |
| prop-types       | Declare types for props passed into React components |
| react            | React library                                        |
| react-dom        | React library for DOM rendering                      |
| react-redux      | Connects React components to Redux                   |
| react-router-dom | React library for routing                            |
| react-toastify   | Display messages to the user                         |
| redux            | Library for unidirectional data flows                |
| redux-thunk      | Async redux library                                  |
| reselect         | Memoize selectors for performance                    |

### Development Dependencies

| **Dependency**                  | **Use**                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| @babel/core                     | Transpiles modern JavaScript so it runs cross-browser            |
| babel-eslint                    | Lint modern JavaScript via ESLint                                |
| babel-loader                    | Add Babel support to Webpack                                     |
| babel-preset-react-app          | Babel preset for working in React. Used by create-react-app too. |
| css-loader                      | Read CSS files via Webpack                                       |
| cssnano                         | Minify CSS                                                       |
| enzyme                          | Simplified JavaScript Testing utilities for React                |
| enzyme-adapter-react-16         | Configure Enzyme to work with React 16                           |
| eslint                          | Lints JavaScript                                                 |
| eslint-loader                   | Run ESLint via Webpack                                           |
| eslint-plugin-import            | Advanced linting of ES6 imports                                  |
| eslint-plugin-react             | Adds additional React-related rules to ESLint                    |
| fetch-mock                      | Mock fetch calls                                                 |
| html-webpack-plugin             | Generate HTML file via webpack                                   |
| http-server                     | Lightweight HTTP server to serve the production build locally    |
| jest                            | Automated testing framework                                      |
| json-server                     | Quickly create mock API that simulates create, update, delete    |
| mini-css-extract-plugin         | Extract imported CSS to a separate file via Webpack              |
| node-fetch                      | Make HTTP calls via fetch using Node - Used by fetch-mock        |
| npm-run-all                     | Display results of multiple commands on single command line      |
| postcss-loader                  | Post-process CSS via Webpack                                     |
| react-test-renderer             | Render React components for testing                              |
| react-testing-library           | Test React components                                            |
| redux-immutable-state-invariant | Warn when Redux state is mutated                                 |
| redux-mock-store                | Mock Redux store for testing                                     |
| rimraf                          | Delete files and folders                                         |
| style-loader                    | Insert imported CSS into app via Webpack                         |
| webpack                         | Bundler with plugin ecosystem and integrated dev server          |
| webpack-bundle-analyzer         | Generate report of what's in the app's production bundle         |
| webpack-cli                     | Run Webpack via the command line                                 |
| webpack-dev-server              | Serve app via Webpack                                            |


------------------------------------------------------------------------------------------

## configuring babel in package.json
- presets
    - transpiles JSX and modern JS features
        - Object spread, class props, dynamic imports, etc 
        - Same babel preset used by create react app

## eslint config in package.json
- "extends" enables recommended rules
- "parser" ensures eslint understands code
- "parserOptions" specifies ECMA version used
- "env" specifies environments; tells eslint to expect certain globals
- "rules"
    - override debugger and console
- "settings"
    - indicates react version used (avoids not specified error)
- "root"
    - avoids conflicting linting rules

------------------------------------------------------------------------------------------

## Four common ways to declare react components
- (1) createClass
- (2) ES class
- (3) Function
- (4) Arrow function

### createClass Component
- OG method
    - React.createClass
    - not required in modern JS

### JS (ES) class
- uses extend to extend react component

### Function
- assumes return statement is render function
- only argument is props passed in

### Arrow
- concise arrow syntax 
    - can omit return statement if arrow is single expression
    - if multiple JSX lines, can wrap in parentheses to make single expression

### Function component benefits
- easier to understand
- avoid 'this' keyword and its annoying quirks
    - eliminates need for binding
- less transpile code -> better performance
- high signal-to-noise ratio
    - use destructuring on props
    - omit return statement if single line (or wrapped) statement
- enhanced code completion/intellisense
    - destructured props -> all data used specified as simple function argument
- Easy to test
- Improved performance
- Classes may be removed altogether in future (HOOKS)

### When to use class vs function component?
- if using react version lower than 16.8, function components lack key features
- however, from react 16.8 on, hooks make using function components for almost everything
    - useEffect -> lifecycle events, for example
- When to use Class
    - componentDidError
    - getSnapshotBeforeUpdate
    - ...that's it

### Container vs Presentation Components

#### Container 
- Concerned with behavior, marshalling data and actions
- little or no markup
    - think of as backend for frontend
- passing data and actions to child (presentation) components
- Typically stateful
    - In redux-> use redux's connect function at bottom of file 
- Connect to redux store and pass down to child components (presentational)

#### Presentational (most components)
- Nearly all markup
- Receive function, data, and actions via props
- Know nothing about redux
- Rely on props to display UI
    - no dependency on rest of app such as redux stores
- Often stateless
- most in redux app are presentation components

------------------------------------------------------------------------------------------
## Redux

### Redux vs Context vs Lift State

#### Lift State to common parent (App.jsx)
- Lift state, user data lifted to common ancestor and passed to children
    - "prop drilling"
    - good first step for small apps
    - becomes tedious
        - leads to components with many props that exist merely to pass data down

#### Context
- Expose global data and functions from given react component...but not truly global data
    - UserContext.Provider 
        - holds user data and functions, often in App.jsx (common ancestor)
    - UserContext.Consumer
        - Import UserContext and access data via UserContext.Consumer

#### Redux
- Centralized Store
    - Conceptualize store as local CS database where App's global data stored
    - Any component can connect to Redux store
        - Store cannot be changed directly
        - Instead, any component can dispatch an Action (such as Create User)
        - When action dispatched, store updated to reflect new data 
            - Any connected components receive data from store and re-render

### When is Redux helpful?
- Complex data flows
- Intercomponent communication
- Non-hierarchical data
- Many actions
    - Structure and scalability becomes increasingly helpful
- Same data used in many places

### Thought process when determining if Redux is helpful
- (1) begin with state in a single component
- (2) Lift state as needed
- (3) Try Context or Redux when lifting state gets tedious and isn't scaling well

## 3 Core Principles of Redux

### (1) One Immutable Store
- State cannot be changed directly 
    - One immutable store aids debugging, supports server rendering, etc

### (2) Actions trigger changes
- Only way to change state -> emit an action
- Describe a users intent
- Example action:
    - type: SUBMIT_CONTACT_FORM
    - triggers: submit contact form action

### (3) Reducers Update State (Pure Functions)
- State changes handled by pure functions
    - Reducers
        - Function that accepts current state in an action and returns a new state

## Flux vs Redux

### Similarities
- Data Down, Actions Up 
- Unidirectional Data Flow Philosophy Enforced
- Actions
    - Define a finite set of actions specifying how state can be changed
        - Action creators to generate actions
        - Action type consts in both as well
- Store
    - Both have conept of store that holds state
    - Redux
        - Typically a single store
    - Flux
        - Typically has multiple stores

### Differences

#### Redux
- Reducers
    - Pure functions that take current state in an action and return a new state
- Containers
    - React components with a specific use
    - Contain necessary logic for marshalling data and actions
        - Pass down to dumb child components via props 
    - Easy to test, simple to reuse
- Immutability
    - Redux store immutable


#### Flux has three core concepts
- Actions
- Dispatchers
- Stores
    - When actions are triggered, stores are notified via dispatcher 
    - Uses singleton dispatcher to connect actions to stores 
    - Stores use event emitter to connect to dispatcher 
    - each store needs to connect to dispatcher via eventEmitter

#### Redux
- No dispatcher
    - Relies on pure functions (reducers) instead
    - each action handled by one or more reducers which update the single store 
- State is immutable
    - Reducer returns a new, updated copy of state which updates store

#### Flux vs Redux cont
- Flux
    - Stores contain state and change logic
    - Supports having multiple stores (user store and product store for example)
    - Flat and disconnected stores
        - does provide a way for stores to interact in order however
            - waitFor function
    - Singleton Dispatcher
        - Sits at center of App
        - Connects actions to stores
    - React components subscribe to stores via onChange handlers and eventEmitters
    - Manipulate state directly
        - State is mutated because it is mutable 
- Redux
    - Honors single responsibility principle by separating logic for handling state
        - Store and changes in logic are separate
        - all state-changing logic handled via reducers
            - reducer accepts current state in an action and returns an action 
    - Only one store
        - Avoids storing of data in multiple places 
        - Eliminates complexity of handling interactions between stores
        - Conceptually simpler model
        - Can utilize multiple stores--even nest them via functional composition 
    - No dispatcher
        - Single store passes actions down to defined reducers 
        - Does so via calling root reducer
        - Pure functions (reducers); no need for eventEmitter pattern
    - Container components utilize connect 
        - React-Redux companion library that connects components to Redux store
    - State is immutable 
        - Return an updated copy of state rather than manipulating it directly 

### Redux Flow
- Unidrectional data flows
- Action describes users intent
    - Action must have a type property 
        - { type: RATE_COURSE, rating: 5 }
- Action ultimately handled by a Reducer 
    - Returns new state based on action passed
    - typically contain a switch statement that determines type of action passed 
- Store is updated once new state returned form Reducer
    - Rerenders any components utilizing data
    - Components connected via React-Redux

------------------------------------------------------------------------------------------

## Actions, Stores, and Reducers

### (1) Action Creators
- Plain objects containing description of event
    - Must have a type property
        - Pass any value that is serializable to JSON
    - Actions created by action creators
- Considered convenience functions 
    - rateCourse(rating) { return { type: RATE_COURSE, rating: rating } }
- dispatching actions affects data in store

### (2) Creating Redux Store
- let store = createStore(reducer)
- Create Store in apps entry point
- Honors single responsibility principle
    - Simply stores data
    - Easier to manage and understand
- Store can
    - dispatch an action
    - subscribe to a listener
    - return its current state
    - replace a reducer
        - useful to support hot-reloading (replaceReducer)
- Store is immutable

#### Immutability
- What JS types are already immutable?
    - Number, string, boolean, undefined, null
        - Each time value changed a new copy is created
- What JS types are mutable?
    - Objects, arrays, functions
- Redux depends on immutable state to enhance performance
    - Returns not object -> not mutating state 

##### Copy via Object.assign
- Signature
    - Object.assign(target, ...sources)
- Example
    - Object.assign({}, state, { role: 'admin' })
- Specifies existing object as a template
    - Each new param declared on right overrides param on left
    - Easy to forget first param needs to be empty object
        - If no empty object
            - State mutated; new object created
- only creates shallow copies
    - nested objects must be cloned too

##### Copy via Spread operator
- const newState = { ...state, role: 'admin' }
    - creates new object that is copy of state but with role prop of admin
- const newUsers = [ ...state.users ]
    - creates copy of an array
- only creates shallow copies
    - nested objects must be cloned too
        - consider the following
            - const user = { name: 'Cory', address: { state: 'CA' } }
        - The only way to clone the nested address object as well is as follows
            - const userCopy = { ...user, address: { ...user.address } }
        - Only clone nested object if object val needs to be modified however

##### Only clone what changes
- Deep merging tools such as clone-deep or lodash.merge
    - Avoid blindly deep cloning
    - Why?
        - Deep cloning is expensive, wasteful, and causes unnecessary renders
- Instead, clone only the objects and sub-objects and sub-sub-objects that have changed

##### Immer
- write mutative code and immer will handle change in an immutable manner
- https://www.npmjs.com/package/immer
- Additional libraries to handle state changes immutably
    - seamless-immutable
    - react-addons-update
    - immutable.js

##### Array Methods
- Avoid
    - Push, pop, reverse
        - These require cloning the array first
        - This avoids mutating the original array
- Prefer
    - Map, filter, reduce, find, concat, spread
        - Immutable friendly
        - return new array (don't mutate existing array)

#### Why is state immutable in Redux? Three core benefits
- Clarity
    - When state updated, where and how it happened is straightforward
        - It occurred in Reducer
- Performance
    - Checking every property is not necessary if state is immutable 
    - Redux can do a reference comparison
        - if old state isn't referencing same object in memory, then state changed
            - if (prevStoreState !== storeState) ...
        - won't rerender component if !change
        - performance optimization
- Enhanced Debugging
    - Time-travel debugging
        - can go back through history and see each specific state change
        - can undo individual state changes to see how it impacts final state
    - Turn off individual actions that occurred to see what state would look like if it had never happend (rewrite state history!)
    - Undo/Redo
    - Play interactions back with click of a button
        - Can toggle the speed at which it plays back 

#### Enforcing Immutability
- If state mutated in redux, will introduce a bug 
- Solution
    - Trust the team if small
    - Install redux-immutable-state-invariant library 
        - https://www.npmjs.com/package/redux-immutable-state-invariant
        - Warns if state is accidentally mutated
        - Only run in dev -> does a lot of obj copying which can degrade performance
    - Programatically enforce immutability
        - use Immer, Immutable.js, seamless-immutable, etc
            - Immer freezes objects disallowing mutations
            - Immutable.js creates immutable JS data structures

### (3) Reducers
- Takes state in an action and returns new state
    - function myReducer (state, action) {...}
- Think of reducer like a meat grinder
    - ingredients go in, results come out
- Determines action passed on switch and updates state accordingly
- Must be pure functions
    - know it's pure if calling with same arg(s) always returns same val(s)
- Instead of mutating state, return a copy of what was passed in 
    - Redux uses that to update store state
- All reducers called on each dispatch
    - Switch statement in reducer determines whether reducer has anthing to do with new state

#### Forbidden in Reducers
- Mutate arguments
- Perform side effects
- Call non-pure functions 
    - date.now() or math.random() -> non-pure

#### Reducer handles its "Slice" of state
- only passed its slice of state
    - can only access portion of state it directly manages
    - handle changes to different pieces of store in isolation

#### Reducer Composition
- Each action can be handled by multiple reducers
- Each reducer can handle multiple actions
    - "Write independent small reducer functions that are each responsible for updates to a specific slice of state. We call this pattern "reducer composition". A given action could be handled by all, some, or none of them." - Redux FAQ
------------------------------------------------------------------------------------------

## Connecting React to Redux
- Container vs Presentation components
- React-Redux
    - Provider
    - Connect

### Container (smart) vs Presentational (dumb) Component Types
- Container
    - Focus on how things work
    - Aware of Redux
    - Subscribe to Redux State
    - Dispatch Redux actions
    - Generated by React-Redux
- Presentational
    - Focus on how things look
    - Unaware of Redux
    - Read data from props
    - Invoke callbacks on props
    - Written by hand

### React-Redux 
- Companion library for Redux
- Two Core Items
    - (1) Provider Component
    - (2) Connect Component

#### React-Redux Provider
- utilized at apps root
- attaches app to redux store
- only need to use once in root 

#### React-Redux Connect
- Creates (smart) container components
- Wraps component so that it is connected to store
- connect(mapStateToProps, mapDispatchToProps)
    - typically two parameters
    - both params functions
    - both params optional

##### mapStateToProps
- Useful for defining what part of Redux store to expose as props
- when defined, component subscribes to component store updates
    - on each update, mapStateToProps called 
- returns an object 
    - each object defined becomes a property on container component
- Determines what state is available on container component 
    - logical place to filter or otherwise transform state to conveniently shape and sort for component use
- increased specificity
    - all props connected or pieces of props? you can choose
- If doing something expensive, use library like Reselect
    - https://www.npmjs.com/package/reselect
    - Memoization is like caching for function calls
        - Each time a function is called, reselect checks whether it was just called with same params 
            - if just called, it simply returns memoized value 
            - useful for increasing performance

##### mapDispatchToProps
- Specifies what actions to expose as props
    - Determines desired actions to expose
- Receives dispatch as its loan parameter 
    - returns callback props to be passed down
- Four ways to hande mapDispatchToProps
    - (1) Ignore it
        - Optional argument when call connect
        - omission means you can call dispatch manually and pass it an action creator
            - requires more boilerplate
            - have to explicitly call dispatch and pass it an action to be fired
            - means child components need to reference dispatch function as well as action creators 
                - to simplify child components and avoid tying them to redux this approach is not ideal 
    - (2) Wrap manually
        - wrap each actionCreators in dispatch call
        - is redundant
    - (3) bindActionCreators
        - call bindActionCreators which will wrap actions passed in dispatch call
            - accessing prop via component would require this.props.actions.actionName
            - saves a bit of typing
    - (4) Return object
        - Redux's connect automatically wraps each objectCreator in dispatch
            - Concise

### Redux Benefits
- No manual unsubscribe (no mas boilerplate)
- Declare subset of state desired
- Enhance performance for free
    - Avoids unncessary rerenders




------------------------------------------------------------------------------------------