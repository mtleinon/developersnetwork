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
  comments: any;
}

export interface NewPost {
  name: string;
  text: string;
  avatar: string;
}

export interface NewComment {
  text: string;
  name: string;
  avatar: string;
}

export interface Comment extends NewComment {
  _id: string;
  user: string;
}

export interface PostState {
  post: Post;
  posts: Post[] | null;
  loading: boolean;
}

export interface PostRootState {
  post: PostState;
}

export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const GET_ERRORS = 'GET_ERRORS';
export const POST_LOADING = 'POST_LOADING';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

export type PostActionTypes =
  | typeof CLEAR_ERRORS
  | typeof GET_ERRORS
  | typeof POST_LOADING
  | typeof GET_POST
  | typeof GET_POSTS
  | typeof DELETE_POST
  | typeof ADD_POST;

export interface PostLoadingAction {
  type: typeof POST_LOADING;
  payload?: string;
}
export interface AddPostAction {
  type: typeof ADD_POST;
  payload: Post;
}
export interface GetPostAction {
  type: typeof GET_POST;
  payload: Post;
}
export interface GetPostsAction {
  type: typeof GET_POSTS;
  payload: Post[];
}
export interface DeletePostAction {
  type: typeof DELETE_POST;
  payload: string;
}

export type PostActions =
  | PostLoadingAction
  | AddPostAction
  | GetPostAction
  | GetPostsAction
  | DeletePostAction;
