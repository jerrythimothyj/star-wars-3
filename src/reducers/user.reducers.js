import { LOGIN_REQUESTED, LOGIN, LOGOUT_REQUESTED, LOGOUT, LOGIN_FAILED } from '../constants/user.constants';

const initialState = {
  username: '',
  password: '',
  loginSucceeded: false,
  loginFailed: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state
      }

    case LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password,
        loginSucceeded: true
      }
    
    case LOGIN_FAILED:
      return {
        ...state,
        loginFailed: true
      }
    
    case LOGOUT_REQUESTED:
      return {
        ...state
      }

    case LOGOUT:
      return {
        ...state
      }

    default:
      return state
  }
}