import courseReducer from './courseReducer.jsx';
import * as actions from '../actions/courseActions.jsx';

it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
        {
            title: 'A'
        },
        {
            title: 'B'
        }
    ];

    const newCourse = {
        title: 'C'
    };

    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
});

it("should update course when passed UPDATE_COURSE_SUCCESS", () => {
    //arrange
    const initialState  = [
        {
            id: 1,
            title: 'A'
        },
        {
            id: 2,
            title: 'B'
        },
        {
            id: 3,
            title: 'C'
        }
    ];
    const course = { id: 2, title: "Biophysical Chemistry" }
    const action = actions.updateCourseSuccess(course);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == course.id);
    const untouchedCourse = newState.find(a => a.id == 1);

    // assert
    expect(updatedCourse.title).toEqual("Biophysical Chemistry");
    expect(untouchedCourse.title).toEqual("A");
    expect(newState.length).toEqual(3);
});

/*
expect new course length to be 3 this ensures that another course wasn't added on update
*/
