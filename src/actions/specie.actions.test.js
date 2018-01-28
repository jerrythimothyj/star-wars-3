import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '../mock-localstorage';
import * as actions from './specie.actions';
import { SEARCH_SPECIES_REQUESTED,
  SEARCH_SPECIES,
  SEARCH_SPECIES_FAILED,
  SEARCH_SPECIE_ALLOWED_REQUESTED,
  SEARCH_SPECIE_ALLOWED,
  SEARCH_SPECIE_ALLOWED_FAILED,
  RESET_SEARCH_SPECIE_COUNTER } from '../constants';
import { secondsMax } from '../services';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  specie: '',
  species: [],
  isSearchAllowed: true,
  loaded: true,
  previousAllowed: false,
  nextAllowed: false,
  page: 1,
  remainingSeconds: secondsMax,
  format: '',
};

describe('specie actions', () => {
  it('should create SEARCH_SPECIES_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_SPECIES_REQUESTED,
      loaded: false,
    };
    expect(actions.searchSpeciesRequested()).toEqual(expectedAction);
  });

  it('should create SEARCH_SPECIES', () => {
    const expectedAction = {
      type: SEARCH_SPECIES,
      specie: 'huttt',
      species: [],
      previousAllowed: false,
      nextAllowed: false,
      page: 1,
      format: '',
      loaded: true,
    };
    expect(actions.searchSpeciesAC('huttt', [], false, false, 1, '')).toEqual(expectedAction);
  });

  it('should create SEARCH_SPECIES_FAILED', () => {
    const expectedAction = {
      type: SEARCH_SPECIES_FAILED,
      loaded: true,
    };
    expect(actions.searchSpeciesFailed()).toEqual(expectedAction);
  });

  it('should create SEARCH_SPECIE_ALLOWED_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_SPECIE_ALLOWED_REQUESTED,
      loaded: true,
    };
    expect(actions.searchSpecieAllowedRequested()).toEqual(expectedAction);
  });

  it('should create SEARCH_SPECIE_ALLOWED', () => {
    const expectedAction = {
      type: SEARCH_SPECIE_ALLOWED,
      specie: 'huttt',
      isSearchAllowed: true,
      loaded: true,
    };
    expect(actions.searchSpecieAllowedAC('huttt')).toEqual(expectedAction);
  });

  it('should create SEARCH_SPECIE_ALLOWED_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_SPECIE_ALLOWED_FAILED,
      remainingSeconds: '3',
      isSearchAllowed: false,
      loaded: true,
    };
    expect(actions.searchSpecieAllowedFailed('3')).toEqual(expectedAction);
  });

  it('should create searchSpecies', () => {
    const store = mockStore({ initialState });

    store.dispatch(actions.searchSpecies());
    const storeActions = store.getActions();
    const expectedAction = {
      type: SEARCH_SPECIES_REQUESTED,
      loaded: false,
    };
    expect(storeActions[0]).toEqual(expectedAction);
  });

  it('should create isSpecieSearchAllowedFn', () => {
    const store = mockStore({ initialState });

    store.dispatch(actions.isSpecieSearchAllowedFn('hutt'));
    const storeActions = store.getActions();
    const expectedAction = [
      {
        loaded: true,
        type: SEARCH_SPECIE_ALLOWED_REQUESTED,
      },
      {
        isSearchAllowed: true,
        loaded: true,
        specie: 'hutt',
        type: SEARCH_SPECIE_ALLOWED,
      },
    ];

    expect(storeActions).toEqual(expectedAction);
  });

  it('should create RESET_SEARCH_SPECIE_COUNTER', () => {
    const expectedAction = {
      type: RESET_SEARCH_SPECIE_COUNTER,
      remainingSeconds: secondsMax,
    };
    expect(actions.resetSearchSpecieCounter()).toEqual(expectedAction);
  });

  it('should create resetSearchSpecieCounterFn', () => {
    const store = mockStore({ initialState });

    store.dispatch(actions.resetSearchSpecieCounterFn());
    const storeActions = store.getActions();
    const expectedAction = [{ remainingSeconds: 60, type: RESET_SEARCH_SPECIE_COUNTER }];

    expect(storeActions).toEqual(expectedAction);
  });
});
