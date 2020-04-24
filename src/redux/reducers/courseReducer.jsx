import * as types from '../actions/actionTypes.jsx';
import initialState from './initialState.jsx';

// all reducers accept state and an action as args
export default function courseReducer(
    state = initialState.courses, 
    action
) {
    switch(action.type) {
        case types.CREATE_COURSE_SUCCESS:
            return [...state, { ...action.course }];
        // (a)
        case types.UPDATE_COURSE_SUCCESS:
            return state.map(course => 
                course.id === action.course.id 
                    ? action.course 
                    : course    
            );
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        // (b)
        case types.DELETE_COURSE_OPTIMISTIC:
            return state.filter(course => course.id !== action.course.id)
        default: 
            return state;
    }
}

// always declare reducer default so if !change in state it is untouched

/*
(a)
    map returns a new array
        mapping over the courses achieves this
            pinpoint course with the id that was changed
            then replace it in the array
            this returns a new array and replaces a value in the array
            all without changing the order of the array!
    utilizing the "concise arrow syntax"
        return is implied -> a single expression without curly braces
*/

/*
(b)
    return array of courses but omit deleted course
        this is achieved via JS's filter function
            filter accepts a predicate ->
                predicate is a function that accepts
                an item and returns a boolean result
            ensure that course.id is not action.course.id
        the filter function returns a new array without mutating state
            returns an array with one coursed omitted from the list
*/