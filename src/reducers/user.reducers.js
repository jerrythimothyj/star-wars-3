import { LOGIN_REQUESTED, LOGIN, LOGOUT_REQUESTED, LOGOUT, LOGIN_FAILED, LOGOUT_FAILED } from '../constants/user.constants';

const initialState = {
  username: '',
  password: '',
  submitted: false,
  loginSucceeded: false,
  loginFailed: false,
  logoutSucceeded: false,
  logoutFailed: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        submitted: true
      }

    case LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password,
        submitted: true,
        loginSucceeded: true,
        loginFailed: false
      }
    
    case LOGIN_FAILED:
      return {
        ...state,
        submitted: true,
        loginSucceeded: false,
        loginFailed: true
      }
    
    case LOGOUT_REQUESTED:
      return {
        ...state
      }

    case LOGOUT:
      return {
        ...state,
        logoutSucceeded: true,
        logoutFailed: false
      }
    
      case LOGOUT_FAILED:
        return {
          ...state,
          logoutSucceeded: false,
          logoutFailed: true
        }

    default:
      return state
  }
}