import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import peopleService from './people.services';
import { SEARCH_PEOPLES, SEARCH_PEOPLES_FAILED } from '../../constants';
import remainingSeconds from '../search/search.services';


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
  remainingSeconds,
  format: '',
};

it('should execute peopleService', () => {
  const store = mockStore({ initialState });

  return store.dispatch(peopleService('luke', 1, ''))
    .then(() => {
      const actions = store.getActions();
      const expectedActions = [
        {
          type: SEARCH_PEOPLES,
          people: 'luke',
          peoples: [{
            name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male', homeworld: 'https://swapi.co/api/planets/1/', films: ['https://swapi.co/api/films/2/', 'https://swapi.co/api/films/6/', 'https://swapi.co/api/films/3/', 'https://swapi.co/api/films/1/', 'https://swapi.co/api/films/7/'], species: ['https://swapi.co/api/species/1/'], vehicles: ['https://swapi.co/api/vehicles/14/', 'https://swapi.co/api/vehicles/30/'], starships: ['https://swapi.co/api/starships/12/', 'https://swapi.co/api/starships/22/'], created: '2014-12-09T13:50:51.644000Z', edited: '2014-12-20T21:17:56.891000Z', url: 'https://swapi.co/api/people/1/',
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

it('should execute peopleService else block', () => {
  const store = mockStore({ initialState });

  return store.dispatch(peopleService('lukey', 2, ''))
    .then(() => {
      const actions = store.getActions();
      const expectedActions = [
        {
          type: SEARCH_PEOPLES_FAILED,
          loaded: true,
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
});
