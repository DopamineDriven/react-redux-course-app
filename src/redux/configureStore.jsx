import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index.jsx';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
    return createStore(
        rootReducer, 
        initialState, 
        composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    )
}

// redux-immutable-state-invariant; ensure to invoke with parentheses
    // warns if any state accidentally mutated in store

// composeEnhancers
    // adds support for redux dev tools
    // oddly formatted global chosen to avoid name collisions
    // composeEnhancers calls applyMiddleware
    // applyMiddleware calls thunk and reduxImmutableStateInvariant()
    // L A Y E R S