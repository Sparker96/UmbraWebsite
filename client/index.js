import '../public/index.css';
import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App"
import NavBar from './components/NavBar';

const root = createRoot(document.getElementById("app")); // make sure this is the same as the id of the div in your index.html

root.render(
    <Router>
      <Provider store={store}>
        <NavBar />
        <App />
      </Provider>
    </Router>
  );