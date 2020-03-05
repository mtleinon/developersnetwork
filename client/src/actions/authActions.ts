import { Actions } from './types';
import { History } from 'history';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password2: string;
}
export interface LoginData {
  email: string;
  password: string;
}

type Dispatch = (action: { type: Actions; payload: any }) => void;

// Register a new user
export const registerUser = (userData: RegisterData, history: History) => (
  dispatch: Dispatch
) => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      dispatch({ type: Actions.GET_ERRORS, payload: {} });
      history.push('/login');
    })
    .catch(err =>
      dispatch({ type: Actions.GET_ERRORS, payload: err.response.data })
    );
};

// Login a user - get user Json Web Token
export const loginUser = (userData: LoginData) => (dispatch: Dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: Actions.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = (decoded: any) => {
  return {
    type: Actions.SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => (dispatch: Dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
