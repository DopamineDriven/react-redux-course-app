import * as types from '../actions/actionTypes.jsx';
import initialState from './initialState.jsx';

// all reducers accept state and an action as args
export default function authorReducer(state = initialState.authors, action) {
    switch(action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        default: 
            return state
    }
}