import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Auth } from '../../reducers/authReducer';
import { ErrorsRootState } from '../../types/errorTypes';
import { loginUser, LoginData } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const initialLoginData: LoginData = {
  email: '',
  password: ''
};

export default function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: Auth) => state.auth);
  const errors = useSelector((state: ErrorsRootState) => state.errors);

  const [loginData, setLoginData] = useState<LoginData>(initialLoginData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData(s => ({ ...s, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [auth, history]);

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>
              Sign in to your DevConnector account
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                name='email'
                placeholder='Email Address'
                value={loginData.email}
                onChange={onChange}
                error={errors.email}
              />
              <TextFieldGroup
                name='password'
                type='password'
                placeholder='Password'
                value={loginData.password}
                onChange={onChange}
                error={errors.password}
              />
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
