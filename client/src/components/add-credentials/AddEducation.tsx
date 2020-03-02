import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileActions';
import { ErrorsRootState } from '../../types/errorTypes';

const initialEducationData = {
  schoolId: '',
  degree: '',
  fieldOfStudy: '',
  from: '',
  to: '',
  current: false,
  description: '',
  disabled: false
};

export default function Component() {
  const history = useHistory();
  const errors = useSelector((state: ErrorsRootState) => state.errors);
  const dispatch = useDispatch();

  const [educationData, setEducationData] = useState(initialEducationData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setEducationData(s => ({ ...s, [name]: value }));
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducationData(currentState => ({
      ...currentState,
      // disabled: true,
      disabled: !currentState.disabled,
      current: !currentState.current
      // current: ''
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addEducation(
        {
          ...educationData,
          current: educationData.current ? 'true' : 'false'
        },
        history
      )
    );
  };

  return (
    <div className='add-education'>
      <div className='container'>
        <div className='col-md-8 m-auto'>
          <Link to='/dashboard' className='btn btn-light'>
            Go Back
          </Link>
          <h1 className='display-4 text-center'>Add Education</h1>
          <p className='lead text-center'>
            Add any school, bootcamp, etc that you have attended.
          </p>
          <small className='d-block pb-3'>* = required fields</small>
          <form onSubmit={onSubmit}>
            <TextFieldGroup
              name='schoolId'
              placeHolder='* School or Bootcamp'
              value={educationData.schoolId}
              onChange={onChange}
              error={errors.schoolId}
            />
            <TextFieldGroup
              name='degree'
              placeHolder='* Degree or Certificate'
              value={educationData.degree}
              onChange={onChange}
              error={errors.degree}
            />
            <TextFieldGroup
              name='fieldOfStudy'
              placeHolder='Field of study'
              value={educationData.fieldOfStudy}
              onChange={onChange}
              error={errors.fieldOfStudy}
            />
            <h6>From date</h6>
            <TextFieldGroup
              name='from'
              type='date'
              value={educationData.from}
              onChange={onChange}
              error={errors.from}
            />
            <h6>To date</h6>
            <TextFieldGroup
              name='to'
              type='date'
              value={educationData.to}
              onChange={onChange}
              error={errors.to}
              disabled={educationData.disabled}
            />
            <div
              className='from-check md-4'
              style={{ padding: '0 0 20px 20px', marginTop: '-10px' }}
            >
              <input
                type='checkbox'
                className='form-check-input'
                name='current'
                value={educationData.current ? 'x' : ''}
                checked={educationData.current}
                onChange={onCheck}
                id='current'
              />
              <label htmlFor='current' className='form-check-label'>
                Current School
              </label>
            </div>
            <TextAreaFieldGroup
              name='description'
              placeHolder='Education description'
              value={educationData.description}
              onChange={onChange}
              error={errors.description}
              info='Tell us about your experience and what you learned'
            />
            <input type='submit' className='btn btn-info btn-block mt-4' />
          </form>
        </div>
      </div>
    </div>
  );
}
