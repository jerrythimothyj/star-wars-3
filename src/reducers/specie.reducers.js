import { SEARCH_SPECIES_REQUESTED, SEARCH_SPECIES, SEARCH_SPECIES_FAILED, SEARCH_SPECIE_ALLOWED_REQUESTED, SEARCH_SPECIE_ALLOWED, SEARCH_SPECIE_ALLOWED_FAILED } from '../constants/specie.constants';
import remainingSeconds from '../services/search/search.services';

const initialState = {
  specie: '',
  species: [],
  isSearchAllowed: true,
  loaded: true,
  previousAllowed: false,
  nextAllowed: false,
  page: 1,
  remainingSeconds,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SPECIES_REQUESTED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_SPECIES:
      return {
        ...state,
        specie: action.specie,
        species: action.species,
        loaded: action.loaded,
        previousAllowed: action.previousAllowed,
        nextAllowed: action.nextAllowed,
        page: action.page,
      };

    case SEARCH_SPECIES_FAILED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_SPECIE_ALLOWED_REQUESTED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_SPECIE_ALLOWED:
      return {
        ...state,
        isSearchAllowed: action.isSearchAllowed,
        specie: action.specie,
        loaded: action.loaded,
      };

    case SEARCH_SPECIE_ALLOWED_FAILED:
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
