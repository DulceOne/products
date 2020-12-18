import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectRoute = ({ path, to }) => (
  <Route path={path} render={() => (<Redirect to={to} />)} />
);

RedirectRoute.defaultProps = {
  to: '',
  path: [],
};

export default RedirectRoute;
