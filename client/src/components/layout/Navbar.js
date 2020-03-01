import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';


const GuestLinks = (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/register">
        Sign Up
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/login">
        Login
      </Link>
    </li>
  </ul>
);

const AuthLinks = ({ handleLogout, user }) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/feed">
        Post Feed
        </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/dashboard">
        Dashboard
        </Link>
    </li>
    <li className="nav-item">
      <a
        onClick={handleLogout}
        className="nav-link"
        href="#!"
      >
        <img
          className="rounded-circle"
          src={user.avatar}
          alt={user.name}
          style={{ width: '25px', marginRight: '15px' }}
          title="You must have a Gravatar connect to your email to display an image"
        />
        Logout
        </a>
    </li>
  </ul>
);

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(clearCurrentProfile());
    dispatch(logoutUser())
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
            </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                  </Link>
              </li>
            </ul>
            {auth.isAuthenticated ?
              <AuthLinks user={auth.user} handleLogout={onLogoutClick.bind(this)} />
              : GuestLinks}
          </div>
        </div>
      </nav>
    </div>
  );
}
