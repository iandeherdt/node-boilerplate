import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,
  REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS } from '../constants';
import api from '../api/user-api';

export function login(username, password){
  return dispatch => {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    return api.login(username, password, (err, res) => {
      if(err){
        dispatch({
          type: LOGIN_USER_FAILURE
        });
      } else if(res.body.user && res.body.token){
        dispatch({
          type: LOGIN_USER_SUCCESS,
          data: res.body.user,
        });
        sessionStorage.setItem('token', res.body.token);
      } else {
        console.log('Error occured: ', res.body);
      }
    });
  };
}

export function oAuthLoginSuccess(user, token){
  return dispatch => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      data: user,
    });
    sessionStorage.setItem('token', token);
  };
}

export function logout(){
  return dispatch => {
    dispatch({
      type: LOGOUT_USER,
    });
    sessionStorage.setItem('token', '');
  };
}

export function register(user){
  return dispatch => {
    return api.register(user, (err, res) => {
      if(err){
        dispatch({
          type: REGISTER_USER_FAILURE
        });
      } else if(res.body){
        dispatch({
          type: REGISTER_USER_SUCCESS,
          data: res.body,
        });
      }
    });
  };
}

export function resetPassword(password, confirmPassword, token, history){
  return api.resetPassword(password, confirmPassword, token, (err) => {
    if(err){
      console.log('Error occured: ', err);
    } else {
      history.push('login');
    }
  });
}

export function forgotPassword(email){
  return dispatch => {
    return api.forgotPassword(email, (err) => {
      if(err){
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
          data: email,
        });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          data: email,
        });
      }
    });
  };
}