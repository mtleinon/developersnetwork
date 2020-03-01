import { Actions } from '../actions/types';

interface ErrorsData {
  email?: string;
  name?: string;
  password?: string;
  password2?: string;
}

export interface Errors {
  errors: ErrorsData;
}

const initialState: ErrorsData = {};

interface Action {
  type: Actions.GET_ERRORS | Actions.CLEAR_ERRORS;
  payload: any;
}

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case Actions.GET_ERRORS:
      return action.payload;
    case Actions.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
