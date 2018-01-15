import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED } from '../constants/planet.constants';
import { push } from 'react-router-redux'
import { planetService } from '../services/planet/planet.services';

export const searchPlanets = (planet) => {
    return dispatch => {
      dispatch({
        type: SEARCH_PLANETS_REQUESTED
      })

      planetService(planet).then(planets => {
        if(planets) {
          dispatch({
            type: SEARCH_PLANETS,
            planet,
            planets
          })
        } else {
          dispatch({
            type: SEARCH_PLANETS_FAILED
          })
        }
      })
    }
  }