import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activeStyle = { color: '#F15B2A' }
    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle}>
                Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/courses" activeStyle={activeStyle}>
                Courses
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/about" activeStyle={activeStyle}>
                About
            </NavLink>
        </nav>
    )
};

export default Header;
