import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CourseForm from './CourseForm.jsx';

// (a)
afterEach(cleanup)

// (b)
function renderCourseForm(args) {
    let defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };
    const props = { ...defaultProps, ...args };
    return render(<CourseForm {...props} />)
}

// (c)
it("should render Add Course header", () => {
    const { getByText } = renderCourseForm();
    getByText("Add Course")
});

it('should label save button as "Save" when not saving', () => {
    const { getByText } = renderCourseForm();
    getByText("Save")
});

// (d)
it('should label save button as "Saving..." when saving', () => {
    const { getByText/*, debug*/ } = renderCourseForm({ saving: true });
    // debug();
    getByText("Saving...")
});


/*
(a)
Cleanup function to run after each test
    Can centralize this configuration for more extensive usage cases
*/

/*
(b)
    call render on return statement with RTL 
    instead of shallow as you would in enzyme
    Note
        render function returns an object with a number of different methods
*/

/*
(c)
Goal
    CourseForm component should render the Add Course header 
Note
    Destructuring { getByText } -> method returned by render function above
        searches through component output and finds text "Add Course"
    getByText function has an assertion built-in
*/

/*
(d)
can utilize debugging (and destructure it)
*/