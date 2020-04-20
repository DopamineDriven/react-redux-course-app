import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index.jsx';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
    return createStore(
        rootReducer, 
        initialState, 
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
    )
}

// redux-immutable-state-invariant; ensure to invoke with parentheses
    // warns if any state accidentally mutated in store

// composeEnhancers
    // adds support for redux dev tools
    // oddly formatted global chosen to avoid name collisions
    // hence, why it calls the apply middleware -> reduxImmutableStateInvariant
    // L A Y E R S