import { PostActions } from './../types/postTypes';
import { PostActionTypes, NewPost, NewComment } from '../types/postTypes';
import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from '../types/postTypes';

type Dispatch = (action: { type: PostActionTypes; payload?: any }) => void;

export const addPost = (postData: NewPost) => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
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

// Add Comment to a post
export const addComment = (postId: string, commentData: NewComment) => (
  dispatch: Dispatch
) => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
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
// Get Posts
export const getPosts = () => (dispatch: Dispatch) => {
  dispatch({ type: POST_LOADING });
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get Post with id
export const getPost = (id: string) => (dispatch: any) => {
  dispatch({ type: POST_LOADING });
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Set post loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
// export const clearErrors = function (): PostActions {
//   return {
//     type: PostActions
//   };
// };

// Delete Post
export const deletePost = (postId: string) => (dispatch: Dispatch) => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (postId: string, commentId: string) => (
  dispatch: Dispatch
) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
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

// Add Like to a post
export const addLike = (postId: string) => (dispatch: any) => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove like from a post
export const removeLike = (postId: string) => (dispatch: any) => {
  axios
    .post(`/api/posts/unlike/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
