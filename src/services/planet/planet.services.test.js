import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import planetService from './planet.services';
import { SEARCH_PLANETS } from '../../constants/planet.constants';
import remainingSeconds from '../search/search.services';


const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const initialState = {
  planet: '',
  planets: [],
  isSearchAllowed: true,
  loaded: true,
  previousAllowed: false,
  nextAllowed: false,
  page: 1,
  remainingSeconds,
  format: '',
};

it('should execute planetService', () => {
  const store = mockStore({ initialState });

  return store.dispatch(planetService('alderaan', 1, ''))
    .then(() => {
      const actions = store.getActions();
      const expectedActions = [
        {
          type: SEARCH_PLANETS,
          planet: 'alderaan',
          planets: [{
            name: 'Alderaan', rotation_period: '24', orbital_period: '364', diameter: '12500', climate: 'temperate', gravity: '1 standard', terrain: 'grasslands, mountains', surface_water: '40', population: '2000000000', residents: ['https://swapi.co/api/people/5/', 'https://swapi.co/api/people/68/', 'https://swapi.co/api/people/81/'], films: ['https://swapi.co/api/films/6/', 'https://swapi.co/api/films/1/'], created: '2014-12-10T11:35:48.479000Z', edited: '2014-12-20T20:58:18.420000Z', url: 'https://swapi.co/api/planets/2/',
          }],
          previousAllowed: false,
          nextAllowed: false,
          page: 1,
          format: '',
          loaded: true,
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
});
