import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

export default function Register() {
  let history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);

  const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
  });

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(s => ({ ...s, [name]: value }));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [auth, history])
  
  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2
    };

    dispatch(registerUser(newUser, history));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">
              Create your DevConnector account
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                name="name"
                placeHolder="Name"
                value={state.name}
                onChange={onChange}
                error={errors.name}
              />
              <TextFieldGroup
                name="email"
                type="email"
                placeHolder="Email Address"
                value={state.email}
                onChange={onChange}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a
                Gravatar email"
              />
              <TextFieldGroup
                name="password"
                placeHolder="Password"
                value={state.password}
                onChange={onChange}
                error={errors.password}
                type="password"
              />

              <TextFieldGroup
                name="password2"
                placeHolder="Confirm Password"
                value={state.password2}
                onChange={onChange}
                error={errors.password2}
                type="password"
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
