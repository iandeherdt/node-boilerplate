import { List, fromJS } from 'immutable';
import { REGISTER_USER_FAILURE, DISMISS_ERROR, FORGOT_PASSWORD_FAILURE, RESET_PASSWORD_FAILURE, LOGIN_USER_FAILURE } from '../constants';
import uuidv1 from 'uuid/v1';

const INITIAL_STATE = new List();
const error = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REGISTER_USER_FAILURE:
  case FORGOT_PASSWORD_FAILURE:
  case RESET_PASSWORD_FAILURE:
  case LOGIN_USER_FAILURE:
    return state.push(fromJS({
      id: uuidv1(),
      message: action.data
    }));
  case DISMISS_ERROR:
    //return state;
    return state.filter(x => x.get('id') !== action.data);
  default:
    return state;
  }
};

export default error;