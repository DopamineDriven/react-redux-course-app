export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";
// (a)
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";

/*
(a)
Note:
    By convention, actions ending in "_SUCCESS" assumed to have been result of
    a completed API call
    However, with optimistic delete, the loading state is hidden
        Therefore, this action omits the _SUCCESS suffix
        Why?
            If the suffix was appended, the apiCallsInProgress counter
            would decrement below 0 in apiCallStatus reducer
            Why?
                Because the number of ApiCallsInProgress is not incremented
                when the delete request begins 
*/