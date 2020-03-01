import { Actions } from './../actions/types';
import isEmpty from '../validation/is-empty';

interface AuthData {
  isAuthenticated: boolean;
  user: any;
}

export interface Auth {
  auth: AuthData;
}

interface Action {
  type: Actions.SET_CURRENT_USER;
  payload: any;
}

const initialState: AuthData = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case Actions.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
