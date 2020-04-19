import React, { Component } from 'react';



class CoursesPage extends Component {

        state = {
            course: {
                title: ""
            }
        };

    // arrow functions inherit binding context of their enclosing scope
    handleChange = event => {
        const course = { ...this.state.course, title: event.target.value };
        // can omit {course: course} -> right hand side matches left hand side
        // this is known as object shorthand syntax
        this.setState({ course })
    };

    handleSubmit = event => {
        event.preventDefault()
        alert(this.state.course.title)
    };


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input 
                    type="text" 
                    onChange={this.handleChange} 
                    value={this.state.course.title} 
                />
                <input
                    type="submit"
                    value="save" 
                />
            </form>
        );
    }
}

export default CoursesPage;
