import { LOGIN_REQUESTED, LOGIN} from '../constants/user.constants';
import { push } from 'react-router-redux'

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

      dispatch(push('/planets'));
    }
  }