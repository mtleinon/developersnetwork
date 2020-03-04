import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';
import { ErrorsRootState } from '../../types/errorTypes';
import { Profile } from '../../types/profileTypes';

const options = [
  { label: '* Select professional Status', value: 0 },
  { label: 'Developer', value: 'Developer' },
  { label: 'Junior Developer', value: 'Junior Developer' },
  { label: 'Senior Developer', value: 'Senior Developer' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Student or Learning', value: 'Student or Learning' },
  { label: 'Instructor', value: 'Instructor' },
  { label: 'Intern', value: 'Intern' },
  { label: 'Other', value: 'Other' }
];

const initialProfileData: Profile = {
  _id: '',
  displaySocialInputs: false,
  handle: '',
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
  education: [],
  experience: [],
  user: { name: '', avatar: '', location: '' },
  social: {
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: ''
  }
};

export default function CreateProfile() {
  const history = useHistory();
  const errors = useSelector((state: ErrorsRootState) => state.errors);
  // const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState(initialProfileData);
  const [skills, setSkills] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // profileData.skills = skills.split(',');
    profileData.skills = skills;
    dispatch(createProfile(profileData, history));
  };

  const onChangeSkills = <M extends React.ChangeEvent<HTMLInputElement>>(
    e: M
  ) => {
    const value = e.target.value;
    setSkills(value);
  };

  const onChange = <
    M extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  >(
    e: M
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData(s => ({ ...s, [name]: value }));
  };

  const onChangeS = <M extends React.ChangeEvent<HTMLSelectElement>>(e: M) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData(s => ({ ...s, [name]: value }));
  };

  const toggleDisplaySocialInputs = () => {
    setProfileData(prevState => ({
      ...prevState,
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  const socialInputs = (
    <div>
      <InputGroup
        placeholder='Twitter Profile URL'
        name='twitter'
        icon='fab fa-twitter'
        value={profileData.twitter}
        onChange={onChange}
        error={errors.twitter}
      />
      <InputGroup
        placeholder='Facebook Page URL'
        name='facebook'
        icon='fab fa-facebook'
        value={profileData.facebook}
        onChange={onChange}
        error={errors.facebook}
      />
      <InputGroup
        placeholder='Linkedin Profile URL'
        name='linkedin'
        icon='fab fa-linkedin'
        value={profileData.linkedin}
        onChange={onChange}
        error={errors.linkedin}
      />
      <InputGroup
        placeholder='Youtube Channel URL'
        name='youtube'
        icon='fab fa-youtube'
        value={profileData.youtube}
        onChange={onChange}
        error={errors.youtube}
      />
      <InputGroup
        placeholder='Instagram Page URL'
        name='instagram'
        icon='fab fa-instagram'
        value={profileData.instagram}
        onChange={onChange}
        error={errors.instagram}
      />
    </div>
  );

  return (
    <div className='create-profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Create Your Profile</h1>
            <p className='lead text-center'>
              Let's get some information to make your profile stand out
            </p>
            <small className='d-block pb-3'>* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder='* Profile Handle'
                name='handle'
                value={profileData.handle}
                onChange={onChange}
                error={errors.handle}
                info='A unique handle for your profile URL. Your full name, company name and nick name.'
              />
              <SelectListGroup
                // placeholder='Status'
                name='status'
                value={profileData.status}
                onChange={onChangeS}
                options={options}
                error={errors.status}
                info='Give us an idea of where you are at in your career.'
              />
              <TextFieldGroup
                placeholder='Company'
                name='company'
                value={profileData.company}
                onChange={onChange}
                error={errors.company}
                info='Could be your own company or ony you work for.'
              />
              <TextFieldGroup
                placeholder='Website'
                name='website'
                value={profileData.website}
                onChange={onChange}
                error={errors.website}
                info='Could be your own or a company website.'
              />
              <TextFieldGroup
                placeholder='Location'
                name='location'
                value={profileData.location}
                onChange={onChange}
                error={errors.location}
                info='City & profileData suggested (e.g. Boston, MA)'
              />
              <TextFieldGroup
                placeholder='Skills'
                name='skills'
                value={skills}
                onChange={onChangeSkills}
                error={errors.skills}
                info='Please use comma separated values (e.g. HTML, CSS, Javascript, PHP)'
              />
              <TextFieldGroup
                placeholder='Github Username'
                name='githubusername'
                value={profileData.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info='If you want your latest repos and a Github link, include your username.'
              />
              <TextAreaFieldGroup
                placeholder='A short bio of yourself'
                name='bio'
                value={profileData.bio}
                onChange={onChange}
                error={errors.bio}
                info='Tell us a little about yourself.'
              />

              <div className='mb-3'>
                <button
                  type='button'
                  onClick={toggleDisplaySocialInputs}
                  className='btn btn-light'
                >
                  Add Social Network Links
                </button>
                <span className='text-muted'> Optional</span>
                {profileData.displaySocialInputs && socialInputs}
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
