import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

export default function Profile() {
  const { profile, loading } = useSelector(state => state.profile);
  const history = useHistory();
  const dispatch = useDispatch();

  const { handle } = useParams();

  useEffect(() => {
    if (handle) {
      dispatch(getProfileByHandle(handle));
    }
  }, [dispatch, handle])

  useEffect(() => {
    if (profile === null && loading) {
      history.push('/not-found');
    }
  }, [profile, loading, history])

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
              </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          experience={profile.experience}
          education={profile.education}
        />
        {profile.githubusername ? (
          <ProfileGithub githubusername={profile.githubusername} />
        ) : null}
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">{profileContent}</div>
    </div>
  );
}