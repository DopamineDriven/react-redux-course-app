import React from 'react';
import CourseForm from './CourseForm.jsx';
// (a)
import { shallow } from 'enzyme';

// (b)
function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    }
    const props = { ...defaultProps, ...args }
    return shallow(<CourseForm {...props} />);
}

it ("renders form and header", () => {
    const wrapper = renderCourseForm();
    //console.log(wrapper.debug())
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h2").text()).toEqual("Add Course")
});

it("labels save buttons as 'Save' when not saving", () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find("button").text()).toBe("Save")
});

it("labels save buttons as 'Saving...' when saving", () => {
    const wrapper = renderCourseForm({ saving: true });
    expect(wrapper.find("button").text()).toBe("Saving...")
});

/*
(a)
shallow - renders a single component in isolation
    no DOM created
mount - renders component with children
    DOM is created
*/

/*
(b)
pattern note specific to enzyme (used for React Testing Library as well)
    benefit is keeping tests simple
        declare default props as an object
        accept object that contains arguments to override defaults
    use spread operator to blend the two together
        render component using shallow function 
        then use spread operator to assign all props to component 
*/

/*
(c)
Goal
    test if courseform component renders a form and a header
*/