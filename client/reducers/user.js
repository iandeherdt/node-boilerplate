import { fromJS } from 'immutable';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, REQUEST_STATUSSES } from '../constants';
const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null
};
const INITIAL_STATE = fromJS(initialState);
const user = (state = INITIAL_STATE, action) => {
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
  case LOGOUT_USER:
    return fromJS({
      isAuthenticating: false,
      isAuthenticated: false,
      user: undefined
    });
  case FORGOT_PASSWORD_REQUEST:
    return state
      .set('isSendingForgotPwLink', true);
  case FORGOT_PASSWORD_SUCCESS:
    return state
      .set('isSendingForgotPwLink', false)
      .set('sentPwLinkTo', action.data);
  case FORGOT_PASSWORD_FAILURE:
    return state
      .set('isSendingForgotPwLink', false)
      .set('sentPwLinkTo', undefined);
  case REGISTER_USER_REQUEST:
    return state
      .set('registerUserStatus', REQUEST_STATUSSES.REQUEST);
  case REGISTER_USER_FAILURE:
    return state
      .set('registerUserStatus', REQUEST_STATUSSES.FAILURE);
  case REGISTER_USER_SUCCESS:
    return state
      .set('registerUserStatus', REQUEST_STATUSSES.SUCCESS);
  default:
    return state;
  }
};

export default user;