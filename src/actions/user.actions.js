import { push } from 'react-router-redux';
import { LOGIN_REQUESTED, LOGIN, LOGOUT_REQUESTED, LOGOUT, LOGIN_FAILED, LOGOUT_FAILED } from '../constants';
import { loginService, logoutService } from '../services/user/user.services';

export function loginRequested() {
  return {
    type: LOGIN_REQUESTED,
    submitted: true,
    loaded: false,
  };
}

export function loginAC(username, password) {
  return {
    type: LOGIN,
    username,
    password,
    submitted: true,
    loginSucceeded: true,
    loginFailed: false,
    loaded: true,
  };
}

export function loginFailed() {
  return {
    type: LOGIN_FAILED,
    submitted: true,
    loginSucceeded: false,
    loginFailed: true,
    loaded: true,
  };
}

export const login = (username, password) => (dispatch) => {
  dispatch(loginRequested());
  dispatch(loginService(username, password));
};

export function logoutRequested() {
  return {
    type: LOGOUT_REQUESTED,
  };
}

export function logoutAC() {
  return {
    type: LOGOUT,
    logoutSucceeded: true,
    logoutFailed: false,
  };
}

export function logoutFailed() {
  return {
    type: LOGOUT_FAILED,
    logoutSucceeded: false,
    logoutFailed: true,
  };
}

export const logout = () => (dispatch) => {
  dispatch(logoutRequested());
  if (logoutService()) {
    dispatch(logoutAC());
    dispatch(push('/'));
  } else {
    dispatch(logoutFailed());
  }
};
