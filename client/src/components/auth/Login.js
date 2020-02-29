import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

export default function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);

  const [state, setState] = useState({
    email: "",
    password: "",
    errors: ""
  });

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(s => ({ ...s, [name]: value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginUser({
      email: state.email,
      password: state.password
    }));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [auth, history])

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
              </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                name="email"
                placeHolder="Email Address"
                value={state.email}
                onChange={onChange}
                error={errors.email}
              />
              <TextFieldGroup
                name="password"
                type="password"
                placeHolder="Password"
                value={state.password}
                onChange={onChange}
                error={errors.password}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
