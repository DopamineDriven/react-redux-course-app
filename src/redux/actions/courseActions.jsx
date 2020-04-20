import * as types from './actionTypes.jsx';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course }
}

// where const CREATE_COURSE = "CREATE_COURSE" 
// in actionTypes.jsx