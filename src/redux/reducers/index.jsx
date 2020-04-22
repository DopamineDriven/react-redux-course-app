import { combineReducers } from 'redux';
import courses from './courseReducer.jsx';
import authors from './authorReducer.jsx';

const rootReducer = combineReducers({
    courses, 
    authors
});

export default rootReducer;