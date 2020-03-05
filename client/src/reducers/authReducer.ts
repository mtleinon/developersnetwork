import { Actions } from './../actions/types';
import isEmpty from '../validation/is-empty';
import { AuthData } from '../types/authTypes';

interface Action {
  type: Actions.SET_CURRENT_USER;
  payload: any;
}

const initialState: AuthData = {
  isAuthenticated: false,
  user: {
    id: '',
    name: '',
    avatar: '',
    location: ''
  }
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
