import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions.jsx";
import * as authorActions from "../../redux/actions/authorActions.jsx";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList.jsx";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner.jsx";
import { toast } from 'react-toastify';

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert(`loading courses failed ${error}`);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert(`loading authors failed ${error}`);
      });
    }
  }

  // (a)
  handleDeleteCourse = async course => {
      toast.success("Course deleted");
      try {
        await this.props.actions.deleteCourse(course)
      } catch (error) {
          toast.error("Delete failed. " + error.message, { autoClose: false })
      }
  };

  render() {
      // (b)
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}

        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
                onDeleteClick={this.handleDeleteCourse} 
                courses={this.props.courses} 
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

// (c)
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    },
  };
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(CoursesPage);


/*
(a)
handleDeleteCourse
    optimistic delete
        if API call fails the user will be notified with toast
        that remains on screen until manually closed
    await pauses execution and resumes when async call completes 
    async/await -> syntactic sugar over promises
*/

/*
(b)
ternary conditional
    if loading is true, render spinner
    else, render everything else 
note:
    fragment wrapper <></> required to be added 
    why?
        JSX requires a single top-level element for each expression
        button and CourseList were conflicting in the else statement of conditional 
*/

/*
(c)
use conditional to check if state.authors.length is loaded via ternary
if it is loaded, weave authorName into course array being mapped
to retrieve author name, look in list of redux stores for author
find the author by Id by looking through list of courses and returning name 
Also return list of authors set to state.authors
*/























// --------------------PRE REFACTOR----------------------------------------

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// // imports createCourse function as props
// import * as courseActions from '../../redux/actions/courseActions.jsx';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';

// class CoursesPage extends Component {

//         state = {
//             course: {
//                 title: ""
//             }
//         };

//     // arrow functions inherit binding context of their enclosing scope
//     handleChange = event => {
//         const course = { ...this.state.course, title: event.target.value };
//         // can omit {course: course} -> { course }; object shorthand syntax
//         this.setState({ course })
//     };

//     // (a)
//     // handleSubmit = event => {
//     //     event.preventDefault()
//     //     this.props.dispatch(courseActions.createCourse(this.state.course))
//     // }

//     handleSubmit = event => {
//         event.preventDefault();
//         this.props.actions.createCourse(this.state.course)
//     };

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <h3>Add Course</h3>
//                 <input
//                     type="text"
//                     onChange={this.handleChange}
//                     value={this.state.course.title}
//                 />
//                 <input
//                     type="submit"
//                     value="Save"
//                 />
//                 {this.props.courses.map(course => (
//                     <div key={course.title}>{course.title}</div>
//                 ))}
//             </form>
//         );
//     }
// }
// // (b)
// CoursesPage.propTypes = {
//     courses: PropTypes.array.isRequired,
//     actions: PropTypes.object.isRequired
// };

// // (c)
// function mapStateToProps(state) {
//     return {
//         courses: state.courses
//     }
// }

// // (d)
// function mapDispatchToProps(dispatch) {
//     return {
//         // (e)
//         actions: bindActionCreators(courseActions, dispatch)
//     }
// }

// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
// export default connectedStateAndProps(CoursesPage);
// // export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)

// // react-redux { connect } function
//     // connects components to Redux
//     // container components
//     // takes two parameters
//         // mapStateToProps
//         // mapDispatchToProps
//     // connect function returns a function which then calls component
//         // explains odd syntax of connect(param, param)(component)
//         // refactored for cleaner code

// /*
// (a)
// When mapDispatchToProps not declared, connect automatically adds dispatch as a prop
// Have to dispatch an action; just calling an actionCreator won't do anything.
// actionCreators just return an object. Ugly method
// */

// /*
// (b)
// PropTypes aid in specifying prop-types accepted by component (declared after render)
// */

// /*
// (c)
// mapStateToProps
// determines what state is passed to component via props
// receives two arguments -> state and ownProps (don't need latter here)
//     be as specific as possible about data exposed to component to avoid unnecessary rerenders
// */

// /*
// (d)
// mapDispatchToProps
// decalres what actions to pass to component on props
//     optional parameter
//     when omitted, component gets a dispatch prop injected by default
// */

// /*
// (e)
// bindActionCreators comes with Redux
//     renders manually wrapping actionCreators in a dispatch call unnecessary
//     used in the mapDispatchToProps function
//     will accept a function or an object (can pass all actions, one option, etc)
//     returns object mimicking the original object but with each function wrapped in a call to dispatch
// */
