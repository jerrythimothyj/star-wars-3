import reducer from './people.reducers';
import { SEARCH_PEOPLES_REQUESTED, SEARCH_PEOPLES, SEARCH_PEOPLES_FAILED, SEARCH_PEOPLE_ALLOWED_REQUESTED, SEARCH_PEOPLE_ALLOWED, SEARCH_PEOPLE_ALLOWED_FAILED } from '../constants/people.constants';

describe('people reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      format: '',
      people: '',
      peoples: [],
      isSearchAllowed: true,
      loaded: true,
      nextAllowed: false,
      page: 1,
      previousAllowed: false,
      remainingSeconds: 30,
    });
  });

  it('should handle SEARCH_PEOPLES_REQUESTED', () => {
    expect(reducer({}, {
      type: SEARCH_PEOPLES_REQUESTED,
    })).toEqual({});
  });

  it('should handle SEARCH_PEOPLES', () => {
    expect(reducer(
      {},
      {
        type: SEARCH_PEOPLES,
        people: 'alderaan',
        peoples: [{
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
          url: 'https://swapi.co/api/peoples/2/',
        }],
      },
    )).toEqual({
      people: 'alderaan',
      peoples: [{
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
        url: 'https://swapi.co/api/peoples/2/',
      }],
    });
  });

  it('should handle SEARCH_PEOPLES_FAILED', () => {
    expect(reducer({}, {
      type: SEARCH_PEOPLES_FAILED,
    })).toEqual({});
  });

  it('should handle SEARCH_PEOPLE_ALLOWED_REQUESTED', () => {
    expect(reducer({}, {
      type: SEARCH_PEOPLE_ALLOWED_REQUESTED,
    })).toEqual({});
  });

  it('should handle SEARCH_PEOPLE_ALLOWED', () => {
    expect(reducer({}, {
      type: SEARCH_PEOPLE_ALLOWED,
      isSearchAllowed: true,
    })).toEqual({
      isSearchAllowed: true,
    });
  });

  it('should handle SEARCH_PEOPLE_ALLOWED_FAILED', () => {
    expect(reducer({}, {
      type: SEARCH_PEOPLE_ALLOWED_FAILED,
      isSearchAllowed: false,
    })).toEqual({
      isSearchAllowed: false,
    });
  });
});
