import { SEARCH_PEOPLES_REQUESTED,
  SEARCH_PEOPLES,
  SEARCH_PEOPLES_FAILED,
  SEARCH_PEOPLE_ALLOWED_REQUESTED,
  SEARCH_PEOPLE_ALLOWED,
  SEARCH_PEOPLE_ALLOWED_FAILED,
  RESET_SEARCH_PEOPLE_COUNTER } from '../constants';
import { secondsMax } from '../services';

const initialState = {
  people: '',
  peoples: [],
  isSearchAllowed: true,
  loaded: true,
  previousAllowed: false,
  nextAllowed: false,
  page: 1,
  remainingSeconds: secondsMax,
  format: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PEOPLES_REQUESTED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_PEOPLES:
      return {
        ...state,
        people: action.people,
        peoples: action.peoples,
        loaded: action.loaded,
        previousAllowed: action.previousAllowed,
        nextAllowed: action.nextAllowed,
        page: action.page,
        format: action.format,
      };

    case SEARCH_PEOPLES_FAILED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_PEOPLE_ALLOWED_REQUESTED:
      return {
        ...state,
        loaded: action.loaded,
      };

    case SEARCH_PEOPLE_ALLOWED:
      return {
        ...state,
        isSearchAllowed: action.isSearchAllowed,
        people: action.people,
        loaded: action.loaded,
      };

    case SEARCH_PEOPLE_ALLOWED_FAILED:
      return {
        ...state,
        isSearchAllowed: action.isSearchAllowed,
        loaded: action.loaded,
        remainingSeconds: action.remainingSeconds,
      };

    case RESET_SEARCH_PEOPLE_COUNTER:
      return {
        ...state,
        remainingSeconds: action.remainingSeconds,
      };

    default:
      return state;
  }
};
