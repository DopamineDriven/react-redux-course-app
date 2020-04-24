import { createStore } from 'redux';
import rootReducer from './reducers/index.jsx';
import initialState from './reducers/initialState.jsx';
import * as courseActions from './actions/courseActions.jsx';

it("should handle creating courses", () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = {
        title: "Clean Code"
    };

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    const createdCourse = store.getState().courses[0];
    expect(createdCourse).toEqual(course);
});


/*
Goal
    integration test
        test interactions of action creators, store, and root reducer
    test that the store can handle creating courses
*/