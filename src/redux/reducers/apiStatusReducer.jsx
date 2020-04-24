import * as types from '../actions/actionTypes.jsx';
import initialState from './initialState.jsx';

// (a)
function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === "_SUCCESS"
}

// (b)
export default function apiCallStatusReducer(
    state = initialState.apiCallsInProgress,
    action
) {
    if (action.type == types.BEGIN_API_CALL) {
        return state + 1
    } else if (
        action.type === types.API_CALL_ERROR ||
        actionTypeEndsInSuccess(action.type)
    ) {
        return state - 1
    }
    return state
}

/*
(a)
Helper function to determine whether action type ends in success
    via the use of substring 
*/


/*
(b)
if action type is begin api call then increment number of api calls
    in progress by 1 by returning state + 1
using an if statement instead of a switch since simple reducer
    Redux doesn't force the use of a switch statement
If the action type ends in success, decrement number of API calls in progress
    via the use of helper function 
Also if the API call is errored, decrement number of API calls by one 
*/
