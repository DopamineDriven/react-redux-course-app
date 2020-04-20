import * as types from './actionTypes.jsx';
import * as courseApi from '../../api/courseApi.jsx';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course }
}

// (a)
export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses }
}


// (b)
export function loadCourses() {
    return function(dispatch) {
        return courseApi
            .getCourses()
            .then(courses => {
                dispatch(loadCourseSuccess(courses))
            })
            .catch(error => {
                throw error
            })
    }
}

/*
(a)
    returns action
    has a type equal to types.LOAD_COURSES_SUCCESS
    paylod is courses
    could write courses: courses, but unnecessary
        use object shorthand syntax 
    could declare this function on line 20 inline as follows
        dispatch({ type: types.LOAD_COURSES_SUCCESS, courses })
    better practice to declare separate function for clarity
    Action notation
        Success indicates that async call was successful
        People often create a corresponding failure action type
*/

/* 
(b)
    every thunk returns a function that accepts dispatch as an argument
    thunk middleware passes dispatch as an arg to thunk
    that's how inner function gets dispatch as an argument
    when receiving list of courses, dispatch an action
    pass loadCourseSuccess courses received
    note how courseApi is called from api folder
        this keeps thunks simple and api centralized 
*/