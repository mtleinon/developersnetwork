import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import { Auth } from '../../types/authTypes';
import { ProfileRootState } from '../../types/profileTypes';

export default function Dashboard() {
  const dispatch = useDispatch();
  const auth = useSelector((state: Auth) => state.auth);
  const currentProfile = useSelector(
    (state: ProfileRootState) => state.profile
  );

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const onDeleteClick = () => {
    dispatch(deleteAccount());
  };

  const { user } = auth;
  const { profile, loading } = currentProfile;

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    // If user has profile, display it
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className='lead text-muted'>
            Welcome
            <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
          </p>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div style={{ marginBottom: '60px' }} />
          <button onClick={onDeleteClick} className='btn btn-danger'>
            Delete my account
          </button>
        </div>
      );
    } else {
      // User doesn't have profile, ask to create one
      dashboardContent = (
        <div>
          <p className='lead text-muted'>Welcome {user.name}</p>
          <Link to='/create-profile' className='btn btn-lg btn-info'>
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className='dashboard'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Dashboard</h1>
            <h1 className='display-4'>{dashboardContent}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
