import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '../mock-localstorage';
import * as actions from './user.actions';
import { LOGIN_REQUESTED,
  LOGOUT_FAILED,
  LOGOUT_REQUESTED } from '../constants';

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

describe('user actions', () => {
  it('should create LOGIN_REQUESTED', () => {
    const expectedAction = {
      type: LOGIN_REQUESTED,
      submitted: true,
      loaded: false,
    };
    expect(actions.loginRequested()).toEqual(expectedAction);
  });

  it('should create LOGOUT_FAILED', () => {
    const expectedAction = {
      type: LOGOUT_FAILED,
      logoutSucceeded: false,
      logoutFailed: true,
    };
    expect(actions.logoutFailed()).toEqual(expectedAction);
  });

  it('should create LOGOUT_REQUESTED', () => {
    const expectedAction = {
      type: LOGOUT_REQUESTED,
    };
    expect(actions.logoutRequested()).toEqual(expectedAction);
  });

  it('should execute login', () => {
    const store = mockStore({ initialState });

    store.dispatch(actions.login('Luke Skywalker', '19BBY'));
    const storeActions = store.getActions();
    const expectedAction = {
      type: LOGIN_REQUESTED,
      submitted: true,
      loaded: false,
    };
    expect(storeActions[0]).toEqual(expectedAction);
  });

  it('should execute logout', () => {
    const store = mockStore({ initialState });

    store.dispatch(actions.logout());
    const storeActions = store.getActions();
    const expectedAction = {
      type: LOGOUT_REQUESTED,
    };
    expect(storeActions[0]).toEqual(expectedAction);
  });
});
