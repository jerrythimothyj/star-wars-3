import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants/planet.constants';

const initialState = {
  planet: '',
  planets: [],
  isSearchAllowed: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PLANETS_REQUESTED:
      return {
        ...state
      }

    case SEARCH_PLANETS:
      return {
        ...state,
        planet: action.planet,
        planets: action.planets
      }
    
    case SEARCH_PLANETS_FAILED:
      return {
        ...state
      }
    
    case SEARCH_PLANET_ALLOWED_REQUESTED:
      return {
        ...state
      }

    case SEARCH_PLANET_ALLOWED:
      return {
        ...state,
        isSearchAllowed: action.isSearchAllowed
      }

    case SEARCH_PLANET_ALLOWED_FAILED:
      return {
        ...state,
        isSearchAllowed: action.isSearchAllowed
      }

    default:
      return state
  }
}