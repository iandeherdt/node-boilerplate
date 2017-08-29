import { DISMISS_ERROR } from '../constants';
export function dismissError(id){
  return dispatch => {
    dispatch({
      type: DISMISS_ERROR,
      data: id,
    });
  };
}