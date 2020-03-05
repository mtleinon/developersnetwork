import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerUser, RegisterData } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Auth } from '../../types/authTypes';
import { ErrorsRootState } from '../../types/errorTypes';

export default function Register() {
  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: Auth) => state.auth);
  const errors = useSelector((state: ErrorsRootState) => state.errors);

  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterData(s => ({ ...s, [name]: value }));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [auth, history]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(registerData, history));
  };

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your DevConnector account</p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                name='name'
                placeholder='Name'
                value={registerData.name}
                onChange={onChange}
                error={errors.name}
              />
              <TextFieldGroup
                name='email'
                type='email'
                placeholder='Email Address'
                value={registerData.email}
                onChange={onChange}
                error={errors.email}
                info='This site uses Gravatar so if you want a profile image, use a
                Gravatar email'
              />
              <TextFieldGroup
                name='password'
                placeholder='Password'
                value={registerData.password}
                onChange={onChange}
                error={errors.password}
                type='password'
              />

              <TextFieldGroup
                name='password2'
                placeholder='Confirm Password'
                value={registerData.password2}
                onChange={onChange}
                error={errors.password2}
                type='password'
              />
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
