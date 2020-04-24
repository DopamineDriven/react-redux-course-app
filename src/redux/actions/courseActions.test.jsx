import * as courseActions from './courseActions.jsx';
import * as types from './actionTypes.jsx';
import { courses } from '../../../tools/mockData.js';
import thunk from 'redux-thunk';
// (a)
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

// (b)
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// (c)
describe("Async Actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });
    // (d)
    describe("Load Courses Thunk", () => {
        it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
            fetchMock.mock("*", {
                body: courses,
                headers: { "content-type": "application/json" }
            });
            const expectedActions = [
                { type: types.BEGIN_API_CALL },
                { type: types.LOAD_COURSES_SUCCESS, courses }
            ];
            const store = mockStore({ courses: [] });
            return store.dispatch(courseActions.loadCourses()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
});

// (e)
describe("createCourseSuccess", () => {
    it("should create a CREATE_COURSE_SUCCESS action", () => {
        // arrange
        const course = courses[0];
        const expectedAction = {
            type: types.CREATE_COURSE_SUCCESS,
            course
        }
        // act
        const action = courseActions.createCourseSuccess(course);
        // assert
        expect(action).toEqual(expectedAction)
    })
});




/*
(a)
use fetchMock to test HTTP calls and any API calls made
use configureMockStore to test redux-store
*/

/*
(b)
test an async action by configuring redux mock store 
Note
    configureMockStore expects an array of middleware to be passed in
        only middleware required for test is Redux Thunk 
*/

/*
(c)
describe block grouping test together (nesting)
    tests for async actions within this block
        each test input prompts after each to run 
    using fetchMock to mock the fetch call that happens in thunks 
    fetchMock.restore() keeps tests atomic (indivisible from the greek atomos)
*/

/*
(d)
Goal
    Assert these actions are created
First
    Configure fetchMock
        captures all fetch calls and responds with some mock data
        return a body containing an array of courses
            header set to application/json 
        mimics response API would return but avoids making actual API call
            runs instantly and reliably since faux-API call
Then
    declare actions that one expects to be fired from the thunk (expectedActions)
Lastly 
    create mock redux store by calling mockStore initialized to contain an empty array of courses
    dispatch loadcourses action which returns a promise
    call getActions on mock store to return a list of actions that have occurred
        assert that list of actions matches expected actions declared above
Note
    code is boiler plate; easy to test other thunks once first thunks code made 
*/

/*
(e)
Goal
    createCourseSuccess action
Method
    using the arrange, act, assert pattern (AAA)
Note
    payload will contain course in arrange
    pass the createcoursesuccess action in act
    expect action to equal expected action in assert
Confirms
    when calling createCourseSuccess action creatior,
    expected object shape is returned 
*/