import * as actions from './planet.actions';
import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants';


describe('planet actions', () => {
  it('should create SEARCH_PLANETS_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PLANETS_REQUESTED,
      loaded: false,
    };
    expect(actions.searchPlanetsRequested()).toEqual(expectedAction);
  });

  it('should create SEARCH_PLANETS', () => {
    const expectedAction = {
      type: SEARCH_PLANETS,
      planet: 'alderaaan',
      planets: [],
      previousAllowed: false,
      nextAllowed: false,
      page: 1,
      format: '',
      loaded: true,
    };
    expect(actions.searchPlanetsAC('alderaaan', [], false, false, 1, '')).toEqual(expectedAction);
  });

  it('should create SEARCH_PLANETS_FAILED', () => {
    const expectedAction = {
      type: SEARCH_PLANETS_FAILED,
      loaded: true,
    };
    expect(actions.searchPlanetsFailed()).toEqual(expectedAction);
  });

  it('should create SEARCH_PLANET_ALLOWED_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PLANET_ALLOWED_REQUESTED,
      loaded: true,
    };
    expect(actions.searchPlanetAllowedRequested()).toEqual(expectedAction);
  });

  it('should create SEARCH_PLANET_ALLOWED', () => {
    const expectedAction = {
      type: SEARCH_PLANET_ALLOWED,
      planet: 'alderaaan',
      isSearchAllowed: true,
      loaded: true,
    };
    expect(actions.searchPlanetAllowedAC('alderaaan')).toEqual(expectedAction);
  });

  it('should create SEARCH_PLANET_ALLOWED_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PLANET_ALLOWED_FAILED,
      remainingSeconds: '3',
      isSearchAllowed: false,
      loaded: true,
    };
    expect(actions.searchPlanetAllowedFailed('3')).toEqual(expectedAction);
  });
});
