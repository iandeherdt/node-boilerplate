import { Map, fromJS } from 'immutable';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../constants';
const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null
};
const INITIAL_STATE = fromJS(initialState);
const user = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return fromJS({
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.data
      });
    case LOGIN_USER_FAILURE:
      return fromJS({
        isAuthenticating: false,
        isAuthenticated: false,
        user: undefined
      });
    case LOGIN_USER_REQUEST:
      return fromJS({
        isAuthenticating: true,
        isAuthenticated: false,
        user: undefined
      });
    default:
      return state
  }
}

export default user