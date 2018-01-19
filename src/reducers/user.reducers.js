import { LOGIN_REQUESTED, LOGIN, LOGOUT_REQUESTED, LOGOUT, LOGIN_FAILED, LOGOUT_FAILED } from '../constants/user.constants';

const initialState = {
  username: '',
  password: '',
  submitted: false,
  loginSucceeded: false,
  loginFailed: false,
  logoutSucceeded: false,
  logoutFailed: false,
  loaded: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        submitted: action.submitted,
        loaded: action.loaded
      }

    case LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password,
        submitted: action.submitted,
        loginSucceeded: action.loginSucceeded,
        loginFailed: action.loginFailed,
        loaded: action.loaded
      }
    
    case LOGIN_FAILED:
      return {
        ...state,
        submitted: action.submitted,
        loginSucceeded: action.loginSucceeded,
        loginFailed: action.loginFailed,
        loaded: action.loaded
      }
    
    case LOGOUT_REQUESTED:
      return {
        ...state
      }

    case LOGOUT:
      return {
        ...state,
        logoutSucceeded: action.logoutSucceeded,
        logoutFailed: action.logoutFailed
      }
    
      case LOGOUT_FAILED:
        return {
          ...state,
          logoutSucceeded: action.logoutSucceeded,
          logoutFailed: action.logoutFailed
        }

    default:
      return state
  }
}