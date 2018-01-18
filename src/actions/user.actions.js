import { LOGIN_REQUESTED, LOGIN, LOGOUT_REQUESTED, LOGOUT, LOGIN_FAILED, LOGOUT_FAILED } from '../constants/user.constants';
import { push } from 'react-router-redux'
import { loginService, logoutService } from '../services/user/user.services';

export function loginRequested() {
  return {
    type: LOGIN_REQUESTED
  }
}

export function loginAC(username, password) {
  return {
    type: LOGIN,
    username,
    password
  }
}

export function loginFailed() {
  return {
    type: LOGIN_FAILED
  }
}

export const login = (username, password) => {
    return dispatch => {
      dispatch(loginRequested())

      loginService(username, password).then(response => {
        if(response) {
          dispatch(loginAC(username, password))
          dispatch(push('/planets'));
        } else {
          dispatch(loginFailed())
        }
      })
    }
  }

  export function logoutRequested() {
    return {
      type: LOGOUT_REQUESTED
    }
  }
  
  export function logoutAC() {
    return {
      type: LOGOUT,
      logoutSucceeded: true,
      logoutFailed: false
    }
  }
  
  export function logoutFailed() {
    return {
      type: LOGOUT_FAILED,
      logoutSucceeded: false,
      logoutFailed: true
    }
  }

  export const logout = () => {
    return dispatch => {
      dispatch(logoutRequested())
      if(logoutService()) {
        dispatch(logoutAC())
        dispatch(push('/'));
      } else {
        dispatch(logoutFailed())
      }
    }
  }