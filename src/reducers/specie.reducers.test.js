import reducer from './specie.reducers';
import { SEARCH_SPECIES_REQUESTED, SEARCH_SPECIES, SEARCH_SPECIES_FAILED, SEARCH_SPECIE_ALLOWED_REQUESTED, SEARCH_SPECIE_ALLOWED, SEARCH_SPECIE_ALLOWED_FAILED } from '../constants';

describe('specie reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      format: '',
      specie: '',
      species: [],
      isSearchAllowed: true,
      loaded: true,
      nextAllowed: false,
      page: 1,
      previousAllowed: false,
      remainingSeconds: 30,
    });
  });

  it('should handle SEARCH_SPECIES_REQUESTED', () => {
    expect(reducer({}, {
      type: SEARCH_SPECIES_REQUESTED,
    })).toEqual({});
  });

  it('should handle SEARCH_SPECIES', () => {
    expect(reducer(
      {},
      {
        type: SEARCH_SPECIES,
        specie: 'alderaan',
        species: [{
          name: 'Alderaan',
          rotation_period: '24',
          orbital_period: '364',
          diameter: '12500',
          climate: 'temperate',
          gravity: '1 standard',
          terrain: 'grasslands, mountains',
          surface_water: '40',
          population: '2000000000',
          residents: ['https://swapi.co/api/people/5/', 'https://swapi.co/api/people/68/', 'https://swapi.co/api/people/81/'],
          films: ['https://swapi.co/api/films/6/', 'https://swapi.co/api/films/1/'],
          created: '2014-12-10T11:35:48.479000Z',
          edited: '2014-12-20T20:58:18.420000Z',
          url: 'https://swapi.co/api/species/2/',
        }],
      },
    )).toEqual({
      specie: 'alderaan',
      species: [{
        name: 'Alderaan',
        rotation_period: '24',
        orbital_period: '364',
        diameter: '12500',
        climate: 'temperate',
        gravity: '1 standard',
        terrain: 'grasslands, mountains',
        surface_water: '40',
        population: '2000000000',
        residents: ['https://swapi.co/api/people/5/', 'https://swapi.co/api/people/68/', 'https://swapi.co/api/people/81/'],
        films: ['https://swapi.co/api/films/6/', 'https://swapi.co/api/films/1/'],
        created: '2014-12-10T11:35:48.479000Z',
        edited: '2014-12-20T20:58:18.420000Z',
        url: 'https://swapi.co/api/species/2/',
      }],
    });
  });

  it('should handle SEARCH_SPECIES_FAILED', () => {
    expect(reducer({}, {
      type: SEARCH_SPECIES_FAILED,
    })).toEqual({});
  });

  it('should handle SEARCH_SPECIE_ALLOWED_REQUESTED', () => {
    expect(reducer({}, {
      type: SEARCH_SPECIE_ALLOWED_REQUESTED,
    })).toEqual({});
  });

  it('should handle SEARCH_SPECIE_ALLOWED', () => {
    expect(reducer({}, {
      type: SEARCH_SPECIE_ALLOWED,
      isSearchAllowed: true,
    })).toEqual({
      isSearchAllowed: true,
    });
  });

  it('should handle SEARCH_SPECIE_ALLOWED_FAILED', () => {
    expect(reducer({}, {
      type: SEARCH_SPECIE_ALLOWED_FAILED,
      isSearchAllowed: false,
    })).toEqual({
      isSearchAllowed: false,
    });
  });
});
