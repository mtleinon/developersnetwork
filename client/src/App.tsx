import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';

import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import { clearCurrentProfile } from './actions/profileActions';

interface Token {
  exp: number;
}

// If jwt token exists set it to header and set user info
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode<Token>(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Logout user if token has expired
  if (decoded.exp < Date.now() / 1000) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:handle' component={Profile} />
              <Switch>
                <PrivateRoute exact path='/dashboard' Component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/create-profile'
                  Component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  Component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-experience'
                  Component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-education'
                  Component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/feed' Component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/post/:id' Component={Post} />
              </Switch>
              <Route exact path='/not-found' Component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
