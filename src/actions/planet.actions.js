import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants/planet.constants';
import { push } from 'react-router-redux'
import { planetService } from '../services/planet/planet.services';
import { isSearchAllowedService } from '../services/search/search.services'

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

export const isSearchAllowedFn = () => {
    return dispatch => {
        dispatch({
            type: SEARCH_PLANET_ALLOWED_REQUESTED
        })

        if(isSearchAllowedService()) {
            dispatch({
                type: SEARCH_PLANET_ALLOWED,
                isSearchAllowed: true
            })
        } else {
            dispatch({
                type: SEARCH_PLANET_ALLOWED_FAILED,
                isSearchAllowed: false
            })
        }
    }
}