export interface ExperienceType {
  _id: string;
  company: string;
  title: string;
  from: string;
  to: string;
}

export interface EducationType {
  _id: string;
  schoolId: string;
  degree: string;
  from: string;
  to: string;
}

export interface Profile {
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
}

export interface ProfileState {
  profile: Profile | null;
  profiles: Profile[] | null;
  loading: boolean;
}

export interface ProfileRootState {
  profile: ProfileState;
}

// export enum ProfileActions {
//   GET_PROFILE = 'GET_PROFILE',
//   PROFILE_LOADING = 'PROFILE_LOADING',
//   CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE',
//   GET_PROFILES = 'GET_PROFILES'
// }
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';

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

export type ProfileActionTypes =
  | GetProfileAction
  | ProfileLoadingAction
  | GetProfilesAction
  | ClearCurrentProfileAction;