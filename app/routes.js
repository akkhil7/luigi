import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './components/app.jsx';
import Issue from './components/issue.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import Rules from './components/Rules.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Prizes from './components/Prizes.jsx';

var routes = (
  <Route name="app" path="/" handler={ App }>
    <Route name='login' path='/login' handler={ Login } />
    <Route name="register" path='/register' handler={ Register } />
    <Route name="about" path='/about' handler={ About } />
    <Route name="dashboard" path="/dashboard" handler={ Dashboard } />
    <Route name="contact" path="/contact" handler = { Contact } />
    <Route name="rules" path="/rules" handler={ Rules } />
    <Route name="prizes" path="/prizes" handler={ Prizes } />
  </Route>
);

export default routes;
