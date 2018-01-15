import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED } from '../constants/planet.constants';

const initialState = {
  planet: '',
  planets: []
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

    default:
      return state
  }
}