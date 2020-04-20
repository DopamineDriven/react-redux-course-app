import * as types from '../actions/actionTypes.jsx';

// all reducers accept state and an action as args
export default function courseReducer(state = [], action) {
    switch(action.type) {
        case types.CREATE_COURSE:
            return [...state, { ...action.course }];
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        default: 
            return state
    }
}

// always declare reducer default so if !change in state it is untouched
