export const LOGIN_REQUESTED = 'user/LOGIN_REQUESTED'
export const LOGIN = 'user/LOGIN'

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