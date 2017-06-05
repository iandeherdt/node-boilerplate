import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../constants';
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