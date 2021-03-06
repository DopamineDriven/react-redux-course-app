import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import AboutPage from "./about/AboutPage.jsx";
import PageNotFound from "./PageNotFound.jsx";
import CoursesPage from "./courses/CoursesPage.jsx";
import Container from './container/Container.jsx'
import Wrapper from './wrapper/Wrapper.jsx';
import Footer from './footer/Footer.jsx';
import Navbar from './navbar/Navbar.jsx';
import ManageCoursePage from './courses/ManageCoursePage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
    <div>
        <Navbar />
        <Wrapper>
            <Container>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/courses" component={CoursesPage} />
                    <Route path="/course/:slug" component={ManageCoursePage} />
                    <Route path="/course" component={ManageCoursePage} />
                    <Route component={PageNotFound} />
                </Switch>
                <ToastContainer autoClose={3000} hideProgressBar />
            </Container>
        </Wrapper>
        <Footer />
    </div>
    )
}

export default App;

// switch -> declares only one route should match
// /course/:slug
    // can be thought of as a url friendly id
    // like an id, the slug is unique 
// ensure that the slug route (/course/:slug) is declared first
    // only one route in switch can match so order is important
    // if /course were declared first this method would not function 
