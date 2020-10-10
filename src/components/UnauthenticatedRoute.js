import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { useAppContext } from '../state/appContext';

const getQueryStringParam = (name, url = window.location.href) => {
  const cleanedName = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp('[?&]' + cleanedName + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const UnauthenticatedRoute = ({ children, ...props }) => {
  const { isAuthenticated } = useAppContext();

  const redirect = getQueryStringParam('redirect');

  return isAuthenticated ? (
    <Navigate
      replace
      to={redirect === '' || redirect === null ? '/' : redirect}
    />
  ) : (
    <Route {...props}>{children}</Route>
  );
};
