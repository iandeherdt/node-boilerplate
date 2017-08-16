import { fromJS } from 'immutable';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from '../constants';
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
    return fromJS({
      isAuthenticating: false,
      isAuthenticated: false,
      user: undefined,
      isSendingForgotPwLink: true
    });
  case FORGOT_PASSWORD_SUCCESS:
    return fromJS({
      isAuthenticating: false,
      isAuthenticated: false,
      user: undefined,
      isSendingForgotPwLink: false,
      sentPwLinkTo: action.data
    });
  case FORGOT_PASSWORD_FAILURE:
    return fromJS({
      isAuthenticating: false,
      isAuthenticated: false,
      user: undefined,
      isSendingForgotPwLink: false,
      sentPwLinkTo: undefined
    });
  default:
    return state;
  }
};

export default user;