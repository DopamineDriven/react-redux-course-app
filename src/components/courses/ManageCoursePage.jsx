import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions.jsx';
import { loadAuthors } from '../../redux/actions/authorActions.jsx';
import PropTypes from 'prop-types';


function ManageCoursePage ({ courses, authors, loadAuthors, loadCourses }) {

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
    }, [])


    return (
        <>
            <h2>Manage Course</h2>
        </>
    )
}

ManageCoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        courses: state.courses,
        authors: state.authors
    }
}


// (a)
const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
export default connectedStateAndProps(ManageCoursePage);


/*
(a)
declare mapDispatchToProps as an object instead of a function
call loadCourses and loadAuthors as named import
    The bound action passed on props takes precedence over the module scope
    that is the function scope takes precedence over the module scope 
*/