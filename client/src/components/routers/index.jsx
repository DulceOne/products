import React from 'react';
import { useSelector } from 'react-redux';
import ProtectedRoute from './protectedRouter';
import NotProtectedRoute from './notProtectedRouter';

const Routes = () => {
  const { token } = useSelector((state) => state.user);

  return (
    token
      ? <ProtectedRoute />
      : <NotProtectedRoute />
  );
};

export default Routes;
