import { GET_ERRORS, CLEAR_ERRORS, ErrorsData } from '../types/errorTypes';

const initialState: ErrorsData = {};

interface Action {
  type: typeof GET_ERRORS | typeof CLEAR_ERRORS;
  payload: any;
}

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
