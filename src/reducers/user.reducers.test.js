import reducer from './user.reducers';
import { LOGIN_REQUESTED, LOGIN, LOGOUT_REQUESTED, LOGOUT, LOGIN_FAILED, LOGOUT_FAILED } from '../constants';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      username: '',
      password: '',
      submitted: false,
      loginSucceeded: false,
      loginFailed: false,
      logoutSucceeded: false,
      logoutFailed: false,
      loaded: true,
    });
  });

  it('should handle LOGIN_REQUESTED', () => {
    expect(reducer({}, {
      type: LOGIN_REQUESTED,
      submitted: true,
      loaded: false,
    })).toEqual({
      submitted: true,
      loaded: false,
    });
  });

  it('should handle LOGIN', () => {
    expect(reducer({}, {
      type: LOGIN,
      username: 'Luke Skywalker',
      password: '19BBY',
      submitted: true,
      loginSucceeded: true,
      loginFailed: false,
      loaded: true,
    })).toEqual({
      username: 'Luke Skywalker',
      password: '19BBY',
      submitted: true,
      loginSucceeded: true,
      loginFailed: false,
      loaded: true,
    });
  });

  it('should handle LOGIN_FAILED', () => {
    expect(reducer({}, {
      type: LOGIN_FAILED,
      submitted: true,
      loginSucceeded: false,
      loginFailed: true,
      loaded: true,
    })).toEqual({
      submitted: true,
      loginSucceeded: false,
      loginFailed: true,
      loaded: true,
    });
  });

  it('should handle LOGOUT_REQUESTED', () => {
    expect(reducer({}, {
      type: LOGOUT_REQUESTED,
    })).toEqual({

    });
  });

  it('should handle LOGOUT', () => {
    expect(reducer({}, {
      type: LOGOUT,
      logoutSucceeded: true,
      logoutFailed: false,
    })).toEqual({
      logoutSucceeded: true,
      logoutFailed: false,
    });
  });

  it('should handle LOGOUT_FAILED', () => {
    expect(reducer({}, {
      type: LOGOUT_FAILED,
      logoutSucceeded: false,
      logoutFailed: true,
    })).toEqual({
      logoutSucceeded: false,
      logoutFailed: true,
    });
  });
});
