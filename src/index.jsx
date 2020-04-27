import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App.jsx";
import './index.css';
import configureStore from './redux/configureStore.js';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore();

render(
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>,
  document.getElementById("app")
);

// NOTE
    // can be useful to pass initial state into configureStore() if:
        // server rendering or
        // initializing redux store with data from localStorage
    // passing state here overrides default parameters specified in reducers
    // USE when wanting to rehydrate store using a separate state passed down
    // from the server or stored in localStorage

// Provider
    // higher order component that provides redux store data to child components
        // alias as ReduxProvider for syntactical clarity
    // pass store to provider on props
    // ENTIRE app wrapped in provider component (router and all)
        // allows app to access store globally