import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from '../../types/authTypes';

export default function PrivateRoute({
  exact,
  path,
  Component,
  ...rest
}: {
  exact: boolean;
  path: string;
  Component: any;
  rest?: any[];
}) {
  const auth = useSelector((state: Auth) => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
}
