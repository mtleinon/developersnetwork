import axios from 'axios';
import { History } from 'history';
// import { GetProfileAction } from '../types/profileTypes';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  PROFILE_NOT_FOUND
} from '../types/profileTypes';

// Get all profiles
export const getProfiles = () => (dispatch: any) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res => {
      const convertedData = res.data.map((resProfile: any) => {
        const profile = { ...resProfile };
        if (profile.skills) {
          profile.skills = profile.skills.join(',');
        }
        return profile;
      });
      dispatch({
        type: GET_PROFILES,
        payload: convertedData
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Get profile by handle
export const getProfileByHandle = (handle: string) => (dispatch: any) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      const convertedData = res.data;
      if (convertedData.skills) {
        convertedData.skills = convertedData.skills.join(',');
      }
      dispatch({
        type: GET_PROFILE,
        payload: convertedData
      });
    })
    .catch(err => dispatch({ type: PROFILE_NOT_FOUND }));
};

// Get current profile
export const getCurrentProfile = () => (dispatch: any) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => {
      const convertedData = res.data;
      if (convertedData.skills) {
        convertedData.skills = convertedData.skills.join(',');
      }
      dispatch({
        type: GET_PROFILE,
        payload: convertedData
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create profile
export const createProfile = (profileData: any, history: History) => (
  dispatch: any
) => {
  axios
    .post('/api/profile', profileData)
    .then(res => {
      history.push('/dashboard');
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete experience
export const deleteExperience = (id: string) => (dispatch: any) => {
  // TODO: handle authorization error
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addExperience = (experienceData: any, history: History) => (
  dispatch: any
) => {
  // TODO: handle authorization error
  axios
    .post('/api/profile/experience', experienceData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addEducation = (educationData: any, history: History) => (
  dispatch: any
) => {
  axios
    .post('/api/profile/education', educationData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete education
export const deleteEducation = (id: string) => (dispatch: any) => {
  // TODO: handle authorization error
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete profile
export const deleteAccount = () => (dispatch: any) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
