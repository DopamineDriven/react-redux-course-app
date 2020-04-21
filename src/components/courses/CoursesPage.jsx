import React, { Component } from 'react';
import { connect } from 'react-redux';
// imports createCourse function as props
import * as courseActions from '../../redux/actions/courseActions.jsx';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList.jsx';



class CoursesPage extends Component {
    componentDidMount() {
        this.props.actions.loadCourses().catch(error => {
            alert(`loading courses failed ${error}`)
        })
    }


    render() {
        return (
            <>
                <h2>Courses</h2>
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


function mapStateToProps(state) {
    return {
        courses: state.courses
    }
}



function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
export default connectedStateAndProps(CoursesPage);

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