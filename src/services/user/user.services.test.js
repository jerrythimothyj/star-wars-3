import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginService } from './user.services';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  username: '',
  password: '',
  submitted: false,
  loginSucceeded: false,
  loginFailed: false,
  logoutSucceeded: false,
  logoutFailed: false,
  loaded: true,
};

it('should execute userService', () => {
  const store = mockStore({ initialState });

  return store.dispatch(loginService('Luke Skywalker', '19BBY'))
    .then(() => {
      const actions = store.getActions();
      const expectedActions = {
        type: 'user/LOGIN',
        username: 'Luke Skywalker',
        password: '19BBY',
        submitted: true,
        loginSucceeded: true,
        loginFailed: false,
        loaded: true,
      };
      expect(actions[0]).toEqual(expectedActions);
    });
});
