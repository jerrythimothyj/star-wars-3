import { LOGIN_REQUESTED, LOGIN} from '../constants/user.constants';

const initialState = {
  name: '',
  password: ''
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
        name: action.name,
        password: action.password
      }

    default:
      return state
  }
}