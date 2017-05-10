import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../constants';
import api from '../api/user-api'
function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  };
}

function loginUserSuccess(user) {
  return {
    type: LOGIN_USER_SUCCESS,
    data: user,
  };
}

function loginUserFailure() {
  return {
    type: LOGIN_USER_FAILURE
  };
}

export function login(username, password){
  return dispatch => { 
    dispatch(loginUserRequest);
    return api.login(username, password, (err, res) => {
      if(err){
        dispatch(loginUserFailure);
      } else {
        dispatch(loginUserSuccess);
      }
    });
  }
}