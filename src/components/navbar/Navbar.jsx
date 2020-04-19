import React from "react";
import './Navbar.css';
// import Container from '../Container/Container.jsx'
// import ReactLogo from '../images/Logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const activeStyle = { color: "#ffffff" }
    // use state expanded and setExpanded onClick
    // circle back
  return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
            {/* <NavLink
                to="/" 
                className="navbar-brand">
                <img src={ReactLogo} alt="react" className="img-fluid" height="99.66px" width="99.6px"/>
            </NavLink> */}
            
            {/* <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
            </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink 
                            to="/"
                            activeStyle={activeStyle}
                            className={
                                window.location.pathname === "/"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Home
                        </NavLink>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <NavLink
                            to="/courses"
                            activeStyle={activeStyle} 
                            className={
                                window.location.pathname === "/courses"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Courses
                        </NavLink>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <NavLink
                            to="/about"
                            activeStyle={activeStyle} 
                            className={
                                window.location.pathname === "/about"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            About
                        </NavLink>
                    </li>
                </ul>
           {/* </div> */}
    </nav>
    </React.Fragment>
  )
}

export default Navbar;

/* <div className="header" style={{height: '75px', position: 'relative'}}>
<Layout fluid>
    <Header transparent >
      <Navigation className="Navbar">
            <a href="/">Home</a>
            <a href="/contact">Contact</a>
            <a href="/portfolio">Portfolio</a>
      </Navigation>
    </Header>
    <Content />
</Layout>
</div> */