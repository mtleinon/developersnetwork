export interface ExperienceType {
  _id: string;
  company: string;
  title: string;
  location: string;
  description: string;
  from: string;
  to: string;
}

export interface EducationType {
  _id: string;
  schoolId: string;
  fieldOfStudy: string;
  description: string;
  degree: string;
  from: string;
  to: string;
}

export interface User {
  name: string;
  avatar: string;
  location: string;
}

export interface Social {
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  youtube: string;
}
export interface Profile {
  _id: string;
  displaySocialInputs: boolean;
  handle: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  githubusername: string;
  bio: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  instagram: string;
  experience: ExperienceType[];
  education: EducationType[];
  user: User;
  social: Social;
}

export interface ProfileState {
  profile: Profile | null;
  profiles: Profile[] | null;
  loading: boolean;
  notFound: boolean;
}

export interface ProfileRootState {
  profile: ProfileState;
}

export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export interface GetProfileAction {
  type: typeof GET_PROFILE;
  payload: Profile;
}
export interface ProfileLoadingAction {
  type: typeof PROFILE_LOADING;
  payload: boolean;
}
export interface GetProfilesAction {
  type: typeof GET_PROFILES;
  payload: Profile[];
}
export interface ClearCurrentProfileAction {
  type: typeof CLEAR_CURRENT_PROFILE;
}
export interface ProfileNotFoundAction {
  type: typeof PROFILE_NOT_FOUND;
}

export type ProfileActionTypes =
  | GetProfileAction
  | ProfileNotFoundAction
  | ProfileLoadingAction
  | GetProfilesAction
  | ClearCurrentProfileAction;
