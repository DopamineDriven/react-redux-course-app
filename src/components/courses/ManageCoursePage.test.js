import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../tools/mockData.js';
import { ManageCoursePage } from './ManageCoursePage.jsx';


// (a)
function render(args) {
    const defaultProps = {
        authors,
        courses,
        history: {},
        saveCourse: jest.fn(),
        loadAuthors: jest.fn(),
        loadCourses: jest.fn(),
        course: newCourse,
        match: {}
    };
    const props = { ...defaultProps, ...args };
    return mount(<ManageCoursePage {...props} />)
}

// (b)
it("sets error when attempting to save an empty title field", () => {
    const wrapper = render();
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Title is required.");
});

/*
(a)
Declaring a centralized factory function for simplicity
Passed from React Router in real app -> just stubbing in for test
    could choose to use MemoryRouter as in Navbar test
    or could even wrap with React Router if 
    testing RR-related behavior is desired
Mount(...) renders the component and its children in memory 
Note*
    must pass all props components require, including those injected by Redux
        since running without redux, must pass all necessary props in
*/

/*
(b)
Goal
    sets error when attempting to save an empty title field (validation error)
Note 
    using mount rather than shallow
        necessary to test child components here
        full DOM will be created in memory via JSDOM
Simulate simulates actions (submit, click, etc)
Find error via class of alert
then assert expected text returned 
*/

