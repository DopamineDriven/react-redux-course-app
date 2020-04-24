import React from 'react';
import CourseForm from './CourseForm.jsx';
import renderer from 'react-test-renderer';
import { courses, authors } from '../../../tools/mockData.js';

// (a)
it("sets submit button label to 'Saving...' when saving is true", () => {
    const tree = renderer.create(
        <CourseForm 
            course={courses[0]}
            authors={authors}
            onSave={jest.fn()}
            onChange={jest.fn()}
            saving
        />
    );
    expect(tree).toMatchSnapshot()
});

// (b)
it("sets submit button label to 'Save' when saving is false", () => {
    const tree = renderer.create(
        <CourseForm 
            course={courses[0]}
            authors={authors}
            onSave={jest.fn()}
            onChange={jest.fn()}
            saving={false}
        />
    );
    expect(tree).toMatchSnapshot()
});





/*
(a)
Goal
    ensure the label on save button is properly set
    when the save prop is set to true
        this is how a user knows save is in progress
Notes
    renderer returns a tree
        an object that represents output of react component
        call create method and pass component to render
            pass props that the component takes in
        call mockData above to retrieve data for testing
            courses[0], authors
        jest.fn()
            creates an empty mock function
        set saving prop
            with boolean props, existence of prop infers truth
                no need to explicitly type equals true
    Assertion
        begins with expect
        chain together with variety of other methods from docs  
*/

/*
(b)
Goal
    ensure save button properly set when save prop set to false
*/