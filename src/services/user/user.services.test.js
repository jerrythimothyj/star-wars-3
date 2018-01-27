import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginService, logoutService } from './user.services';
import '../../mock-localstorage';

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

it('should execute userService valid', () => {
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
        logoutSucceeded: false,
        logoutFailed: false,
        loaded: true,
      };
      expect(actions[0]).toEqual(expectedActions);
    });
});

it('should execute userService invalid', () => {
  const store = mockStore({ initialState });

  return store.dispatch(loginService('Luke Skywalker1', '19BBY1'))
    .then(() => {
      const actions = store.getActions();
      const expectedActions = {
        type: 'user/LOGIN_FAILED',
        submitted: true,
        loginSucceeded: false,
        loginFailed: true,
        loaded: true,
      };
      expect(actions[0]).toEqual(expectedActions);
    });
});

it('should execute userService logout', () => {
  const store = mockStore({ initialState });

  store.dispatch(logoutService());
  const actions = store.getActions();
  const expectedActions = {
    type: 'user/LOGOUT',
    logoutSucceeded: true,
    logoutFailed: false,
  };
  expect(actions[0]).toEqual(expectedActions);
});
