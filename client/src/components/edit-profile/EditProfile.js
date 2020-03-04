import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

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

const initialState = {
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
}

export default function EditProfile() {
  const history = useHistory();
  const errors = useSelector(state => state.errors);
  const currentProfile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const [state, setState] = useState(initialState);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  // Fill Edit Profile forms fields when component is mounted
  useEffect(() => {
    if (currentProfile.profile) {
      const profile = currentProfile.profile;

      // Convert skills array back to CSV
      // const skillsCSV = profile.skills.join(',');

      // If profile field doesn't exist, set it to empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.status = !isEmpty(profile.status) ? profile.status : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

      // profile.social is an object
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      // setState({ ...profile, skills: skillsCSV });
      setState({ ...profile });
    }
  }, [currentProfile]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createProfile(state, history));
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
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>

            <h1 className="display-4 text-center">Edit Your Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={state.handle}
                onChange={onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name and nick name."
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={state.status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career."
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={state.company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or ony you work for."
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={state.website}
                onChange={onChange}
                error={errors.website}
                info="Could be your own or a company website."
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={state.location}
                onChange={onChange}
                error={errors.location}
                info="City & state suggested (e.g. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={state.skills}
                onChange={onChange}
                error={errors.skills}
                info="Please use comma separated values (e.g. HTML, CSS, Javascript, PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={state.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username."
              />
              <TextAreaFieldGroup
                placeholder="A short bio of yourself"
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

