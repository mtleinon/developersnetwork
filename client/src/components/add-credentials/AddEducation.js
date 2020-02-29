import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';

const initialState = {
  schoolId: '',
  degree: '',
  fieldOfStudy: '',
  from: '',
  to: '',
  current: '',
  description: '',
  disabled: false
};

export default function Component() {
  const history = useHistory();
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(s => ({ ...s, [name]: value }));
  };

  const onCheck = e => {
    setState(currentState => ({
      ...currentState,
      disabled: !currentState.disabled,
      current: !currentState.current
    }));
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(addEducation({
      ...state,
      current: state.current === '' ? 'false' : 'true'
    },
      history));
  };

  return (
    <div className="add-education">
      <div className="container">
        <div className="col-md-8 m-auto">
          <Link to="/dashboard" className="btn btn-light">
            Go Back
          </Link>
          <h1 className="display-4 text-center">Add Education</h1>
          <p className="lead text-center">
            Add any school, bootcamp, etc that you have attended.
          </p>
          <small className="d-block pb-3">* = required fields</small>
          <form onSubmit={onSubmit}>
            <TextFieldGroup
              name="schoolId"
              placeHolder="* School or Bootcamp"
              value={state.schoolId}
              onChange={onChange}
              error={errors.schoolId}
            />
            <TextFieldGroup
              name="degree"
              placeHolder="* Degree or Certificate"
              value={state.degree}
              onChange={onChange}
              error={errors.degree}
            />
            <TextFieldGroup
              name="fieldOfStudy"
              placeHolder="Field of study"
              value={state.fieldOfStudy}
              onChange={onChange}
              error={errors.fieldOfStudy}
            />
            <h6>From date</h6>
            <TextFieldGroup
              name="from"
              type="date"
              value={state.from}
              onChange={onChange}
              error={errors.from}
            />
            <h6>To date</h6>
            <TextFieldGroup
              name="to"
              type="date"
              value={state.to}
              onChange={onChange}
              error={errors.to}
              disabled={state.disabled ? 'disabled' : ''}
            />
            <div
              className="from-check md-4"
              style={{ padding: '0 0 20px 20px', marginTop: '-10px' }}
            >
              <input
                type="checkbox"
                className="form-check-input"
                name="current"
                value={state.current}
                checked={state.current}
                onChange={onCheck}
                id="current"
              />
              <label htmlFor="current" className="form-check-label">
                Current School
              </label>
            </div>
            <TextAreaFieldGroup
              name="description"
              placeHolder="Education description"
              value={state.description}
              onChange={onChange}
              error={errors.description}
              info="Tell us about your experience and what you learned"
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  );
}
