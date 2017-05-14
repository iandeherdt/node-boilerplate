import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../constants';
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
      } else {
        if(res.body.user){
           dispatch({
            type: LOGIN_USER_SUCCESS,
            data: res.body.user,
          });
        }else{
          console.log('Error occured: ', res.body);
        }
       
      }
    });
  }
}