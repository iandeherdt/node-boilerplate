import { assert } from 'chai';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER } from '../../constants';
import reducer from '../user';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null
};

describe('user reducer', () => {
  it('has default state', () => {
    const action = {type: undefined};
    const nextState = reducer(undefined, action);
    assert.deepEqual(nextState.toJS(), initialState);
  });

  it('handles LOGIN_USER_REQUEST', () => {
    const action = {type: LOGIN_USER_REQUEST};
    const nextState = reducer(undefined, action);
    assert.equal(nextState.get('isAuthenticating'), true);
  });

  it('handles LOGIN_SUCCESS', () => {
    const action = {type: LOGIN_USER_SUCCESS, data: {id:1, name:'ikke@mail.be'}};
    const nextState = reducer(undefined, action);
    assert.equal(nextState.get('isAuthenticating'), false);
    assert.equal(nextState.get('isAuthenticated'), true);
    assert.equal(nextState.getIn(['user', 'id']), 1);
    assert.equal(nextState.getIn(['user', 'name']), 'ikke@mail.be');
  });

  it('handles LOGOUT_USER', () => {
    const actionLogin = {type: LOGIN_USER_SUCCESS, data: {id:1, name:'ikke@mail.be'}};
    const loginState = reducer(undefined, actionLogin);
    assert.equal(loginState.get('isAuthenticating'), false);
    assert.equal(loginState.get('isAuthenticated'), true);
    assert.equal(loginState.getIn(['user', 'id']), 1);
    assert.equal(loginState.getIn(['user', 'name']), 'ikke@mail.be');
    const action = {type: LOGOUT_USER};
    const nextState = reducer(undefined, action);
    assert.equal(nextState.get('isAuthenticating'), false);
    assert.equal(nextState.get('isAuthenticated'), false);
    assert.equal(nextState.getIn(['user', 'id']), undefined);
    assert.equal(nextState.getIn(['user', 'name']), undefined);
  });
});
