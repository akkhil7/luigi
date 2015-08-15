import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './components/app.jsx';
import Issue from './components/issue.jsx';

var routes = (
  <Route name="app" path="/" handler={ App }>
    <Route name="issue" path="/:issue_id" handler={ Issue } />
  </Route>
);

export default routes;
