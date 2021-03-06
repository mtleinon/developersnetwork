import React from 'react';
import isEmpty from '../../validation/is-empty';
import { Profile } from '../../types/profileTypes';

export default function ProfileAbout({ profile }: { profile: Profile }) {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='card card-body bg-light mb-3'>
          <h3 className='text-center text-info'>
            {profile.user.name.trim().split(' ')[0]}'s Bio
          </h3>
          <p className='lead'>
            {isEmpty(profile.bio) ? 'No bio given.' : profile.bio}
          </p>
          <hr />
          <h3 className='text-center text-info'>Skill Set</h3>
          <div className='row'>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
              {profile.skills.split(',').map((skill, index) => (
                <div key={index} className='p-3'>
                  <i className='fa fa-check' /> {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
