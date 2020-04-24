import React from 'react';
import Navbar from './Navbar.jsx';
import { mount, shallow } from 'enzyme';
// (a)
import { MemoryRouter } from 'react-router-dom';

// (b)
it("contains 3 NavLinks via shallow", () => {
    const numLinks = shallow(<Navbar />).find("NavLink").length;
    expect(numLinks).toEqual(3)
});

// (c)
it("contains 3 anchors via mount", () => {
    const numAnchors = mount(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    ).find("a").length;
    expect(numAnchors).toEqual(3)
});


/*
(a)
MemoryRouter
    Navbar component expects to be run as child of react-router and
    thus received react-router's props 
        Only necessary for mount rendering since it receives children
*/

/*
(b)
Goal
    test number of navlinks via shallow
    numLinks scans component for number of NavLink tags in JSX
    assert that there are 3 total
        with shallow render can search for react component tag
*/

/*
(c)
Goal
    test number of navlinks (transpiled to anchors) via mount
Note
    when using mount, a full dom is created in memory using JSDOM behind the scenes
        NavLink ultimately rendered into an anchor tag
            this is what happens after transpiling JSX
        Also necessary to pull in MemoryRouter
        Why?
            The Navbar component expects to be run as a child of react-router
            and receieve React Router's props

*/