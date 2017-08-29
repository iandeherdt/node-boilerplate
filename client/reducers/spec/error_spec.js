import { assert } from 'chai';
import { REGISTER_USER_FAILURE, DISMISS_ERROR } from '../../constants';
import reducer from '../error';
import { List, fromJS } from 'immutable';

describe('user reducer', () => {
  it('has default state', () => {
    const action = {type: undefined};
    const nextState = reducer(undefined, action);
    assert.deepEqual(nextState, new List());
  });

  it('handles REGISTER_USER_FAILURE', () => {
    const action = {type: REGISTER_USER_FAILURE, data: 'my message'};
    const nextState = reducer(undefined, action);
    assert.equal(nextState.getIn([0, 'message']), 'my message' );
  });

  it('handles DISMISS_ERROR', () => {
    const action = {type: DISMISS_ERROR, data: '1234'};
    const nextState = reducer(fromJS([{id:'1234', message:'bla'}]), action);
    assert.equal(nextState.get(0), undefined);
  });
});
