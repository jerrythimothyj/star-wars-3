import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants';
import remainingSeconds from '../services/search/search.services';

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

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PLANETS_REQUESTED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_PLANETS:
      return {
        ...state,
        planet: action.planet,
        planets: action.planets,
        loaded: action.loaded,
        previousAllowed: action.previousAllowed,
        nextAllowed: action.nextAllowed,
        page: action.page,
        format: action.format,
      };

    case SEARCH_PLANETS_FAILED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_PLANET_ALLOWED_REQUESTED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_PLANET_ALLOWED:
      return {
        ...state,
        isSearchAllowed: action.isSearchAllowed,
        planet: action.planet,
        loaded: action.loaded,
      };

    case SEARCH_PLANET_ALLOWED_FAILED:
      return {
        ...state,
        isSearchAllowed: action.isSearchAllowed,
        loaded: action.loaded,
        remainingSeconds: action.remainingSeconds,
      };

    default:
      return state;
  }
};
