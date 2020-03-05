import {
  ProfileState,
  GET_PROFILE,
  PROFILE_NOT_FOUND,
  PROFILE_LOADING,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  ProfileActionTypes
} from '../types/profileTypes';

const initialState: ProfileState = {
  profile: null,
  profiles: null,
  loading: false,
  notFound: false
};

export default (state = initialState, action: ProfileActionTypes) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return { ...state, loading: true, notFound: false };
    case PROFILE_NOT_FOUND:
      return { ...state, profile: null, loading: false, notFound: true };
    case GET_PROFILE:
      return { ...state, loading: false, profile: action.payload };
    case GET_PROFILES:
      return { ...state, loading: false, profiles: action.payload };
    case CLEAR_CURRENT_PROFILE:
      return { ...state, profile: null, loading: false, notFound: false };
    default:
      return state;
  }
};
