import * as types from './actionTypes.jsx';
import * as authorApi from '../../api/authorApi.jsx';
import { beginApiCall, apiCallError } from './apiStatusActions.jsx';

// (a)
export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}


// (b)
export function loadAuthors() {
    return function(dispatch) {
        dispatch(beginApiCall())
        return authorApi
            .getAuthors()
            .then(authors => {
                dispatch(loadAuthorsSuccess(authors))
            })
            .catch(error => {
                dispatch(apiCallError(error))
                throw error
            })
    }
}

/*
(a)
payload is authors (used object shorthand syntax for authors)
*/

/*
(b)
loadAuthors -> Thunk
call authorAPI
call getAuthors
will return list of authors
*/