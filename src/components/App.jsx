import React from 'react';
// switch -> declares only one route should match
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import AboutPage from "./about/AboutPage.jsx";
// import Header from "./common/Header.jsx";
import PageNotFound from "./PageNotFound.jsx";
import CoursesPage from "./courses/CoursesPage.jsx";
import Container from './container/Container.jsx'
import Wrapper from './wrapper/Wrapper.jsx';
import Footer from './footer/Footer.jsx';
import Navbar from './navbar/Navbar.jsx';
import ManageCoursePage from './courses/ManageCoursePage.jsx';


const App = () => {
    return (
    <div>
        <Navbar />
        <Wrapper>
            <Container>
                {/* <Header /> */}
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/courses" component={CoursesPage} />
                    <Route path="/course/:slug" component={ManageCoursePage} />
                    <Route path="/course" component={ManageCoursePage} />
                    <Route component={PageNotFound} />
                </Switch>
            </Container>
        </Wrapper>
        <Footer />
    </div>
    )
}

export default App;

// /course/:slug
    // can be thought of as a url friendly id
    // like an id, the slug is unique 
// ensure that the slug route (/course/:slug) is declared first
    // only one route in switch can match so order is important
    // if /course were declared first this method would not function 
