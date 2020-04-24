import { combineReducers } from 'redux';
import courses from './courseReducer.jsx';
import authors from './authorReducer.jsx';
import apiCallsInProgress from './apiStatusReducer.jsx';

const rootReducer = combineReducers({
    courses, 
    authors,
    apiCallsInProgress
});

export default rootReducer;