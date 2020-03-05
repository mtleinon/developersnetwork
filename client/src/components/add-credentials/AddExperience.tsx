import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addExperience } from '../../actions/profileActions';
import { ErrorsRootState } from '../../types/errorTypes';

export default function AddExperience() {
  const history = useHistory();
  const errors = useSelector((state: ErrorsRootState) => state.errors);
  const dispatch = useDispatch();

  const [experienceData, setExperienceData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setExperienceData(s => ({ ...s, [name]: value }));
  };
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setExperienceData(s => ({ ...s, [name]: value }));
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperienceData(currentState => ({
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
      addExperience(
        {
          ...experienceData,
          current: experienceData.current ? 'true' : 'false'
        },
        history
      )
    );
  };

  return (
    <div className='add-experience'>
      <div className='container'>
        <div className='col-md-8 m-auto'>
          <Link to='/dashboard' className='btn btn-light'>
            Go Back
          </Link>
          <h1 className='display-4 text-center'>Add Experience</h1>
          <p className='lead text-center'>
            Add any job or position that you have had in the past or currently
            have.
          </p>
          <small className='d-block pb-3'>* = required fields</small>
          <form onSubmit={onSubmit}>
            <TextFieldGroup
              name='title'
              placeholder='* Job Title'
              value={experienceData.title}
              onChange={onChange}
              error={errors.title}
            />
            <TextFieldGroup
              name='company'
              placeholder='* Company'
              value={experienceData.company}
              onChange={onChange}
              error={errors.company}
            />
            <TextFieldGroup
              name='location'
              placeholder='Location'
              value={experienceData.location}
              onChange={onChange}
              error={errors.location}
            />
            <h6>From date</h6>
            <TextFieldGroup
              name='from'
              type='date'
              value={experienceData.from}
              onChange={onChange}
              error={errors.from}
            />
            <h6>To date</h6>
            <TextFieldGroup
              name='to'
              type='date'
              value={experienceData.to}
              onChange={onChange}
              error={errors.to}
              disabled={experienceData.disabled}
            />
            <div
              className='from-check md-4'
              style={{ padding: '0 0 20px 20px', marginTop: '-10px' }}
            >
              <input
                type='checkbox'
                className='form-check-input'
                name='current'
                value={experienceData.current ? 'x' : ''}
                checked={experienceData.current}
                onChange={onCheck}
                id='current'
              />
              <label htmlFor='current' className='form-check-label'>
                Current Job
              </label>
            </div>
            <TextAreaFieldGroup
              name='description'
              placeholder='Job description'
              value={experienceData.description}
              onChange={onChangeText}
              error={errors.description}
              info='Tell us about the position'
            />
            <input type='submit' className='btn btn-info btn-block mt-4' />
          </form>
        </div>
      </div>
    </div>
  );
}
