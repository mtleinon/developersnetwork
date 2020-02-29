import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

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

export default function CreateProfile() {
  const history = useHistory();
  const errors = useSelector(state => state.errors);
  // const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const [state, setState] = useState({
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
    errors: {}
  });

  // static propTypes = {
  //   profile: PropTypes.object.isRequired,
  //   errors: PropTypes.object.isRequired
  // };

  const onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: state.handle,
      company: state.company,
      website: state.website,
      location: state.location,
      status: state.status,
      skills: state.skills,
      githubusername: state.githubusername,
      bio: state.bio,
      twitter: state.twitter,
      facebook: state.facebook,
      linkedin: state.linkedin,
      youtube: state.youtube,
      instagram: state.instagram
    };

    dispatch(createProfile(profileData, history));
  };

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(s => ({ ...s, [name]: value }));
  };

  const toggleDisplaySocialInputs = () => {
    setState(prevState => ({
      ...prevState,
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  }

  const socialInputs = (
    <div>
      <InputGroup
        placeholder="Twitter Profile URL"
        name="twitter"
        icon="fab fa-twitter"
        value={state.twitter}
        onChange={onChange}
        error={errors.twitter}
      />
      <InputGroup
        placeholder="Facebook Page URL"
        name="facebook"
        icon="fab fa-facebook"
        value={state.facebook}
        onChange={onChange}
        error={errors.facebook}
      />
      <InputGroup
        placeholder="Linkedin Profile URL"
        name="linkedin"
        icon="fab fa-linkedin"
        value={state.linkedin}
        onChange={onChange}
        error={errors.linkedin}
      />
      <InputGroup
        placeholder="Youtube Channel URL"
        name="youtube"
        icon="fab fa-youtube"
        value={state.youtube}
        onChange={onChange}
        error={errors.youtube}
      />
      <InputGroup
        placeholder="Instagram Page URL"
        name="instagram"
        icon="fab fa-instagram"
        value={state.instagram}
        onChange={onChange}
        error={errors.instagram}
      />
    </div>
  );

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeHolder="* Profile Handle"
                name="handle"
                value={state.handle}
                onChange={onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name and nick name."
              />
              <SelectListGroup
                placeHolder="Status"
                name="status"
                value={state.status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career."
              />
              <TextFieldGroup
                placeHolder="Company"
                name="company"
                value={state.company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or ony you work for."
              />
              <TextFieldGroup
                placeHolder="Website"
                name="website"
                value={state.website}
                onChange={onChange}
                error={errors.website}
                info="Could be your own or a company website."
              />
              <TextFieldGroup
                placeHolder="Location"
                name="location"
                value={state.location}
                onChange={onChange}
                error={errors.location}
                info="City & state suggested (e.g. Boston, MA)"
              />
              <TextFieldGroup
                placeHolder="Skills"
                name="skills"
                value={state.skills}
                onChange={onChange}
                error={errors.skills}
                info="Please use comma separated values (e.g. HTML, CSS, Javascript, PHP)"
              />
              <TextFieldGroup
                placeHolder="Github Username"
                name="githubusername"
                value={state.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username."
              />
              <TextAreaFieldGroup
                placeHolder="A short bio of yourself"
                name="bio"
                value={state.bio}
                onChange={onChange}
                error={errors.bio}
                info="Tell us a little about yourself."
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={toggleDisplaySocialInputs}
                  className="btn btn-light"
                >
                  Add Social Network Links
                  </button>
                <span className="text-muted"> Optional</span>
                {state.displaySocialInputs && socialInputs}
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

