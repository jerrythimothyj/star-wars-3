import { LOGIN_REQUESTED, LOGIN, LOGOUT_REQUESTED, LOGOUT, LOGIN_FAILED } from '../constants/user.constants';
import { push } from 'react-router-redux'
import { loginService } from '../services/user/user.services';

export const login = (username, password) => {
    return dispatch => {
      dispatch({
        type: LOGIN_REQUESTED
      })

      loginService(username, password).then(response => {
        if(response) {
          dispatch({
            type: LOGIN,
            username,
            password
          })
          dispatch(push('/planets'));
        } else {
          dispatch({
            type: LOGIN_FAILED
          })
        }
      })
    }
  }

  export const logout = () => {
    return dispatch => {
      dispatch({
        type: LOGOUT_REQUESTED
      })
  
      dispatch({
        type: LOGOUT
      })

      dispatch(push('/'));
    }
  }