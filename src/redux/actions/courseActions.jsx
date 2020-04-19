// import * as types from './actionTypes.jsx';

export function createCourse(course) {
    // used object shortand syntaax to consolidate course: course
    return { type: "CREATE_COURSE", course }
}