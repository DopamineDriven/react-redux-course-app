import * as types from './actionTypes.jsx';
import * as courseApi from '../../api/courseApi.jsx';
import { beginApiCall, apiCallError } from './apiStatusActions.jsx';

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course }
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course }
}

// (a)
export function loadCourseSuccess(course) {
    return { type: types.LOAD_COURSES_SUCCESS, course }
}

export function deleteCourseOptimistic(course) {
    return { type: types.DELETE_COURSE_OPTIMISTIC, course }
}

// (b)
export function loadCourses() {
    return function(dispatch) {
        dispatch(beginApiCall())
        return courseApi
            .getCourses()
            .then(courses => {
                dispatch(loadCourseSuccess(courses))
            })
            .catch(error => {
                dispatch(apiCallError(error))
                throw error
            })
    }
}
// (c)
export function saveCourse(course) {
    return function(dispatch) {
        dispatch(beginApiCall())
        return courseApi
        .saveCourse(course)
        .then(savedCourse => {
            course.id 
                ? dispatch(updateCourseSuccess(savedCourse))
                : dispatch(createCourseSuccess(savedCourse))
        })
        .catch(error => {
            dispatch(apiCallError(error))
            throw error
        })
    }
}
// (d)
export function deleteCourse(course) {
    return function(dispatch) {
        dispatch(deleteCourseOptimistic(course))
        return courseApi.deleteCourse(course.id)
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

/*
(c)
    new thunk -> saveCourse
    dispatch different actions depending on whether
        creating a new course
        updating an existing course
            this is executed via a ternary
            depends on whether a course id exists or not
    note: 
        may choose to access stores state in thunk without passing course data into thunk
            getState is an optional parameter (ommitted as lint was throwing a warning)
            if a breakpoint is set and parameter watched would see that
                getState has all of Redux store's state inside
                not necessary here, but this can be exceedingly useful
    update:
        dispatch(beginApiCall()) before returning courseApi
            ensure to invoke with parentheses 
*/

/*
(d)
    new thunk -> deleteCourse
    optimistic delete -> 
        no dispatching begin/end api call, actions or apiCallError
        since loading status is not shown to the user for this.
        Rather, immediately dispatching deletion so UI is instantly updated.
*/