import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from '../../types/authTypes';

export default function PrivateRoute({
  Component,
  ...rest
}: {
  Component: any;
  rest: any[];
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

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute);
