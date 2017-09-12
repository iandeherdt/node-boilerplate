import { combineReducers } from 'redux';
import user from './user.reducer';
import error from './error.reducer';
const rootReducer = combineReducers({
  user,
  error
});

export default rootReducer;