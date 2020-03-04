import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';
import { ProfileRootState } from '../../types/profileTypes';

export default function Profile() {
  const { profile, loading, notFound } = useSelector(
    (state: ProfileRootState) => state.profile
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const { handle } = useParams();

  useEffect(() => {
    if (
      !notFound &&
      !loading &&
      handle &&
      (profile === null || (profile && handle !== profile.handle))
    ) {
      dispatch(getProfileByHandle(handle));
    } else if (notFound) {
      history.push('/not-found');
    }
  }, [dispatch, handle, profile, loading, notFound]);

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/profiles' className='btn btn-light mb-3 float-left'>
              Back To Profiles
            </Link>
          </div>
          <div className='col-md-6' />
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
    <div className='profile'>
      <div className='container'>{profileContent}</div>
    </div>
  );
}
