import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions.jsx';
import * as authorActions from '../../redux/actions/authorActions.jsx';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList.jsx';
import { Redirect } from 'react-router-dom';


class CoursesPage extends Component {

    state = {
        redirectToAddCoursePage: false
    }

    componentDidMount() {
        const { courses, authors, actions } = this.props
        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert(`loading courses failed ${error}`)
            })
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert(`loading authors failed ${error}`)
            })
        }
    }


    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}

                <h2>Courses</h2>

                <button 
                    style={{ marginBottom: 20 }}
                    className="btn btn-primary add-course"
                    onClick={() => this.setState({ redirectToAddCoursePage: true })}               
                >
                    Add Course
                </button>

                <CourseList courses={this.props.courses} />
            </>
        )
    }
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// (a)
function mapStateToProps(state) {
    return {
        courses: 
            state.authors.length === 0 
            ? [] 
            : state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(a => a.id === course.authorId).name
                }
            }),
        authors: state.authors
    }
}



function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    }
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
export default connectedStateAndProps(CoursesPage);

/*
(a)
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