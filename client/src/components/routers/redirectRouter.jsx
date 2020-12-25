import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const RedirectRoute = ({ path, to }) => (
  <Route path={path} render={() => (<Redirect to={to} />)} />
);

RedirectRoute.propTypes = {
  to: PropTypes.string,
  path: PropTypes.arrayOf,
};

RedirectRoute.defaultProps = {
  to: '',
  path: [],
};

export default RedirectRoute;
