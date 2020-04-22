import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions.jsx';
import { loadAuthors } from '../../redux/actions/authorActions.jsx';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm.jsx';
import { newCourse } from '../../../tools/mockData.js';

// (a)
function ManageCoursePage ({ 
    courses, 
    authors, 
    loadAuthors, 
    loadCourses,
    saveCourse,
    history, 
    ...props 
}) {
    // (b)
    const [course, setCourse] = useState({ ...props.course });
    const [errors] = useState({});

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert(`loading courses failed ${error}`)
            })
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert(`loading authors failed ${error}`)
            })
        }
    }, []);
    // (c)
    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    }
    // (d)
    function handleSave(event) {
        event.preventDefault();
        saveCourse(course).then(() => {
            history.push('/courses')
        })
    }


    return (
        <CourseForm 
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
        />
    )
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

// (e)
export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null
}

// (f)
function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 
        ? getCourseBySlug(state.courses, slug) 
        : newCourse;    
    return {
        course,
        courses: state.courses,
        authors: state.authors
    }
}

// (g)
const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
export default connectedStateAndProps(ManageCoursePage);


/*
(a)
use rest operator to assign any properties not destructured to object ...props
    rest operator uses same syntax as spread operator
    on function declaration line, rest operator stores any properties
    that haven't been destructured on the left in a var called props
another option would be to alias course as course: initailCourse
    within the destructuring statement
*/


/*
(b)
useState returns a pair of values
    use array destructuring syntax to assign each value a name
useState accepts a default arg
    specifying that it should initialize course state var
    to a copy of the course passed in on props 
*/

/*
(c)
Reference TextInput in CourseForm.jsx
    Each input has a name that corresponds to property it displays
    name="category"
    value=course.category
    errors=errors.category
        Allows corresponding property in state to be updated with a single handler
Destructure event at top of handleChange function
JavaScript's computed property syntax allows the referencing of a property via a variable 
    [name]: -> if input that changed was the title field, [name] is equivalent to writing course.title
Need to handle the authorId differently than any other value, hence the ternary conditional
    Since authorId is a number, use parseInt(value, 10)
    Events returns numbers as strings, so parseInt converts number back to an Int
Destructuring at the top -> can access event inside of the setState function and less code
    Without the destructuring, an error that this synthetic event is reused for performance reasons
    Why? because the synthetic event is no longer defined within the async function 
    Destructuring on the first line circumvents that error because it provides
    a way in which to retain a local reference to the event 
*/


/*
(d)
handleSave accepts an event
    preventDefault called to keep page from refreshing
    then call saveCourse and pass it course available in state
saveCourse is getting passed in on props
    it is being bound to dispatch via mapDispatchToProps declaration
    it is also imported by the same name at the top of file from actions
    however, inside this function, the locally scoped bound var
        passed in on props takes precedence
*/


/*
(e)
getCourseBySlug func
    accepts list of courses and course slug being looked for 
    utilize JS's built-in find method to get requested course
    if it is not found, return null 
These functions are commonly called "Selectors"
    Why? Because it selects data from the Redux store 
*Could also declare in course reducer for global use
    For performance one could even memoize using a library like reselect
        Check out selectors in redux for more info 
        https://redux.js.org/recipes/computing-derived-data
*/


/*
(f)
ownProps parameter -> automatically passed in by Redux
    enables access to component props
    in this case, routing-related props
    use this to read URL data injected on props by React Router
to read course slug from url, a single line of code is required
    const slug = ownProps.match.params.slug 
        access "/course/:slug" in mapStateToProps via ownProps.params.match.slug
            This is one of two paths for ManageCoursePage in app.jsx
*/



/*
(g)
declare mapDispatchToProps as an object instead of a function
call loadCourses and loadAuthors as named import
    The bound action passed on props takes precedence over the module scope
    that is the function scope takes precedence over the module scope 
*/