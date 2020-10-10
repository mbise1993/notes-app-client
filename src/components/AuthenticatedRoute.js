import React from 'react';
import { Route, useLocation, Navigate } from 'react-router-dom';

import { useAppContext } from '../state/appContext';

export const AuthenticatedRoute = ({ children, ...props }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  return isAuthenticated ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Navigate replace to={`/sign-in?redirect=${pathname}${search}`} />
  );
};
