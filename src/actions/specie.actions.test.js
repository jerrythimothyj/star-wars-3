import * as actions from './specie.actions';
import { SEARCH_SPECIES_REQUESTED, SEARCH_SPECIES, SEARCH_SPECIES_FAILED, SEARCH_SPECIE_ALLOWED_REQUESTED, SEARCH_SPECIE_ALLOWED, SEARCH_SPECIE_ALLOWED_FAILED } from '../constants';


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
});
