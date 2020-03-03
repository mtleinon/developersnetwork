export interface Like {
  user: string;
}
export interface Post {
  name: string;
  text: string;
  _id: string;
  likes: Like[];
  avatar: string;
  user: string;
}
/*
export interface ProfileState {
  profile: Profile | null;
  profiles: Profile[] | null;
  loading: boolean;
}

export interface ProfileRootState {
  profile: ProfileState;
}
*/
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const GET_ERRORS = 'GET_ERRORS';
export const POST_LOADING = 'POST_LOADING';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
/*
export interface GetProfileAction {
  type: typeof GET_PROFILE;
  payload: Profile;
}

export type ProfileActionTypes =
  | GetProfileAction
  | ProfileLoadingAction
  | GetProfilesAction
  | ClearCurrentProfileAction;
*/
