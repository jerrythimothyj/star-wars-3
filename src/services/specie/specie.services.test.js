import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import specieService from './specie.services';
import { SEARCH_SPECIES, SEARCH_SPECIES_FAILED } from '../../constants';
import { secondsMax } from '../index';


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

it('should execute specieService', () => {
  const store = mockStore({ initialState });

  return store.dispatch(specieService('hutt', 1, ''))
    .then(() => {
      const actions = store.getActions();
      const expectedActions = [
        {
          type: SEARCH_SPECIES,
          specie: 'hutt',
          species: [{
            name: 'Hutt', classification: 'gastropod', designation: 'sentient', average_height: '300', skin_colors: 'green, brown, tan', hair_colors: 'n/a', eye_colors: 'yellow, red', average_lifespan: '1000', homeworld: 'https://swapi.co/api/planets/24/', language: 'Huttese', people: ['https://swapi.co/api/people/16/'], films: ['https://swapi.co/api/films/3/', 'https://swapi.co/api/films/1/'], created: '2014-12-10T17:12:50.410000Z', edited: '2014-12-20T21:36:42.146000Z', url: 'https://swapi.co/api/species/5/',
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

it('should execute specieService else block', () => {
  const store = mockStore({ initialState });

  return store.dispatch(specieService('huttt', 2, ''))
    .then(() => {
      const actions = store.getActions();
      const expectedActions = [
        {
          type: SEARCH_SPECIES_FAILED,
          loaded: true,
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
});
