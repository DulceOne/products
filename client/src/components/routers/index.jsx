import React, { userSelector } from 'react';
import ProtectedRoute from './protectedRouter';
import NotProtectedRoute from './notProtectedRouter';

const Routes = () => {
  // const token = userSelector(state => state.token);
  const token = false;

  return (
    token
      ? <ProtectedRoute />
      : <NotProtectedRoute />
  );
};

export default Routes;
