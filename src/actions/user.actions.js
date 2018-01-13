import { LOGIN_REQUESTED, LOGIN} from '../constants/user.constants';

export const login = (name, password) => {
    return dispatch => {
      dispatch({
        type: LOGIN_REQUESTED
      })
  
      dispatch({
        type: LOGIN,
        name,
        password
      })
    }
  }