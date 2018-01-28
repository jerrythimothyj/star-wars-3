import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '../mock-localstorage';
import * as actions from './people.actions';
import { SEARCH_PEOPLES_REQUESTED,
  SEARCH_PEOPLES,
  SEARCH_PEOPLES_FAILED,
  SEARCH_PEOPLE_ALLOWED_REQUESTED,
  SEARCH_PEOPLE_ALLOWED,
  SEARCH_PEOPLE_ALLOWED_FAILED,
  RESET_SEARCH_PEOPLE_COUNTER,
} from '../constants';
import { secondsMax } from '../services';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  people: '',
  peoples: [],
  isSearchAllowed: true,
  loaded: true,
  previousAllowed: false,
  nextAllowed: false,
  page: 1,
  remainingSeconds: secondsMax,
  format: '',
};


describe('people actions', () => {
  it('should create SEARCH_PEOPLES_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLES_REQUESTED,
      loaded: false,
    };
    expect(actions.searchPeoplesRequested()).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLES', () => {
    const expectedAction = {
      type: SEARCH_PEOPLES,
      people: 'lukey',
      peoples: [],
      previousAllowed: false,
      nextAllowed: false,
      page: 1,
      format: '',
      loaded: true,
    };
    expect(actions.searchPeoplesAC('lukey', [], false, false, 1, '')).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLES_FAILED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLES_FAILED,
      loaded: true,
    };
    expect(actions.searchPeoplesFailed()).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLE_ALLOWED_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLE_ALLOWED_REQUESTED,
      loaded: true,
    };
    expect(actions.searchPeopleAllowedRequested()).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLE_ALLOWED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLE_ALLOWED,
      people: 'lukey',
      isSearchAllowed: true,
      loaded: true,
    };
    expect(actions.searchPeopleAllowedAC('lukey')).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLE_ALLOWED_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLE_ALLOWED_FAILED,
      remainingSeconds: '3',
      isSearchAllowed: false,
      loaded: true,
    };
    expect(actions.searchPeopleAllowedFailed('3')).toEqual(expectedAction);
  });

  it('should create searchPeoples', () => {
    const store = mockStore({ initialState });

    store.dispatch(actions.searchPeoples());
    const storeActions = store.getActions();
    const expectedAction = {
      type: SEARCH_PEOPLES_REQUESTED,
      loaded: false,
    };
    expect(storeActions[0]).toEqual(expectedAction);
  });

  it('should create isPeopleSearchAllowedFn', () => {
    const store = mockStore({ initialState });

    store.dispatch(actions.isPeopleSearchAllowedFn('luke'));
    const storeActions = store.getActions();
    const expectedAction = [
      {
        loaded: true,
        type: SEARCH_PEOPLE_ALLOWED_REQUESTED,
      },
      {
        isSearchAllowed: true,
        loaded: true,
        people: 'luke',
        type: SEARCH_PEOPLE_ALLOWED,
      },
    ];

    expect(storeActions).toEqual(expectedAction);
  });

  it('should create RESET_SEARCH_PEOPLE_COUNTER', () => {
    const expectedAction = {
      type: RESET_SEARCH_PEOPLE_COUNTER,
      remainingSeconds: secondsMax,
    };
    expect(actions.resetSearchPeopleCounter()).toEqual(expectedAction);
  });

  it('should create resetSearchPeopleCounterFn', () => {
    const store = mockStore({ initialState });

    store.dispatch(actions.resetSearchPeopleCounterFn());
    const storeActions = store.getActions();
    const expectedAction = [{ remainingSeconds: 60, type: RESET_SEARCH_PEOPLE_COUNTER }];

    expect(storeActions).toEqual(expectedAction);
  });
});
