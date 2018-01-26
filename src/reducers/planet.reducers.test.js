import reducer from './planet.reducers';
import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants/planet.constants';

describe('planet reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      format: '',
      planet: '',
      planets: [],
      isSearchAllowed: true,
      loaded: true,
      nextAllowed: false,
      page: 1,
      previousAllowed: false,
      remainingSeconds: 30,
    });
  });

  it('should handle SEARCH_PLANETS_REQUESTED', () => {
    expect(reducer({}, {
      type: SEARCH_PLANETS_REQUESTED,
    })).toEqual({});
  });

  it('should handle SEARCH_PLANETS', () => {
    expect(reducer(
      {},
      {
        type: SEARCH_PLANETS,
        planet: 'alderaan',
        planets: [{
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
          url: 'https://swapi.co/api/planets/2/',
        }],
      },
    )).toEqual({
      planet: 'alderaan',
      planets: [{
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
        url: 'https://swapi.co/api/planets/2/',
      }],
    });
  });

  it('should handle SEARCH_PLANETS_FAILED', () => {
    expect(reducer({}, {
      type: SEARCH_PLANETS_FAILED,
    })).toEqual({});
  });

  it('should handle SEARCH_PLANET_ALLOWED_REQUESTED', () => {
    expect(reducer({}, {
      type: SEARCH_PLANET_ALLOWED_REQUESTED,
    })).toEqual({});
  });

  it('should handle SEARCH_PLANET_ALLOWED', () => {
    expect(reducer({}, {
      type: SEARCH_PLANET_ALLOWED,
      isSearchAllowed: true,
    })).toEqual({
      isSearchAllowed: true,
    });
  });

  it('should handle SEARCH_PLANET_ALLOWED_FAILED', () => {
    expect(reducer({}, {
      type: SEARCH_PLANET_ALLOWED_FAILED,
      isSearchAllowed: false,
    })).toEqual({
      isSearchAllowed: false,
    });
  });
});
