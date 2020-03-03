import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS,
  GET_POST,
  DELETE_POST
} from '../types/postTypes';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload)
      };

    default:
      return state;
  }
};
