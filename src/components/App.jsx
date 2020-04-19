import React from 'react';
// switch -> declares only one route should match
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import AboutPage from "./about/AboutPage.jsx";
// import Header from "./common/Header.jsx";
import PageNotFound from "./PageNotFound.jsx";
import CoursePage from "./courses/CoursePage.jsx";
import Container from './container/Container.jsx'
import Wrapper from './wrapper/Wrapper.jsx';
import Footer from './footer/Footer.jsx';
import Navbar from './navbar/Navbar.jsx';


const App = () => {
    return (
    <div>
        <Navbar fluid />
        <Wrapper>
            <Container fluid>
                {/* <Header /> */}
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/courses" component={CoursePage} />
                    <Route component={PageNotFound} />
                </Switch>
            </Container>
        </Wrapper>
        <Footer />
    </div>
    )
}

export default App;
