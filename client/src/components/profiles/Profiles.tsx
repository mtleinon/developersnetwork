import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';
import { ProfileRootState } from '../../types/profileTypes';

export default function Profiles() {
  const { profiles, loading } = useSelector(
    (state: ProfileRootState) => state.profile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  let profileItems;

  if (profiles === null || loading) {
    profileItems = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No profiles found...</h4>;
    }
  }

  return (
    <div className='profiles'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4 text-center'>Develooper Profiles</h1>
            <p className='lead text center'>
              Browse and connect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profiles.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile
// });

// const mapDispatchToProps = {
//   getProfiles
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Profiles);
