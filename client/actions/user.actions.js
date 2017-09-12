import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, ACTIVATE_ACCOUNT_REQUEST,
  REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_FAILURE, ACTIVATE_ACCOUNT_FAILURE, ACTIVATE_ACCOUNT_SUCCESS,
  REGISTER_USER_REQUEST } from '../constants';
import api from '../api/user.api';

function checkErrorReponse(err){
  return err && err.response.body && err.response.body && err.response.body.message;
}

export function login(username, password, history){
  return dispatch => {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    return api.login(username, password, (err, res) => {
      if(err){
        dispatch({
          type: LOGIN_USER_FAILURE,
          data: checkErrorReponse(err) ? err.response.body.message : t('loginFailed')
        });
      } else if(res.body.user && res.body.token){
        dispatch({
          type: LOGIN_USER_SUCCESS,
          data: res.body.user,
        });
        sessionStorage.setItem('token', res.body.token);
        history.push('');
      } else {
        dispatch({
          type: LOGIN_USER_FAILURE,
          data: res.body
        });
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
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    return api.register(user, (err, res) => {
      if(err){
        dispatch({
          type: REGISTER_USER_FAILURE,
          data: checkErrorReponse(err) ? err.response.body.message : t('registerFailed')
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

export function registerSocial(user){
  return dispatch => {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    return api.registerSocial(user, (err, res) => {
      if(err){
        dispatch({
          type: REGISTER_USER_FAILURE,
          data: checkErrorReponse(err) ? err.response.body.message : t('registerFailed')
        });
      } else if(res.body){
        dispatch({
          type: REGISTER_USER_SUCCESS,
          data: res.body,
        });
        history.push('login');
      }
    });
  };
}

export function resetPassword(password, confirmPassword, token, history){
  return dispatch => {
    return api.resetPassword(password, confirmPassword, token, (err) => {
      if(err){
        dispatch({
          type: RESET_PASSWORD_FAILURE,
          data: checkErrorReponse(err) ? err.response.body.message : t('resetPasswordFailed')
        });
      } else {
        history.push('login');
      }
    });
  };
}

export function forgotPassword(email){
  return dispatch => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    return api.forgotPassword(email, (err) => {
      if(err){
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
          data: checkErrorReponse(err) ? err.response.body.message : t('forgotPasswordFailed')
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

export function activateAccount(token){
  return dispatch => {
    dispatch({
      type: ACTIVATE_ACCOUNT_REQUEST,
    });
    return api.activateAccount(token, (err, res) => {
      if(err){
        dispatch({
          type: ACTIVATE_ACCOUNT_FAILURE,
          data: checkErrorReponse(err) ? err.response.body.message : t('activateAccountFailed')
        });
      } else {
        dispatch({
          type: ACTIVATE_ACCOUNT_SUCCESS,
        });
        dispatch({
          type: LOGIN_USER_SUCCESS,
          data: res.body.user,
        });
        sessionStorage.setItem('token', res.body.token);
        history.push('');
      }
    });
  };
}