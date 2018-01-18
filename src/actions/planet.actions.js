import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants/planet.constants';
import { planetService } from '../services/planet/planet.services';
import { isSearchAllowedService } from '../services/search/search.services'

export function searchPlanetsRequested() {
    return {
      type: SEARCH_PLANETS_REQUESTED
    }
}

export function searchPlanetsAC(planet, planets) {
    return {
      type: SEARCH_PLANETS,
      planet,
      planets
    }
}

export function searchPlanetsFailed() {
    return {
      type: SEARCH_PLANETS_FAILED
    }
}

export const searchPlanets = (planet) => {
    return dispatch => {
        dispatch(searchPlanetsRequested())

        planetService(planet).then(planets => {
            if(planets) {
                dispatch(searchPlanetsAC(planet, planets))
            } else {
                dispatch(searchPlanetsFailed())
            }
        })
    }
}

export function searchPlanetAllowedRequested() {
    return {
      type: SEARCH_PLANET_ALLOWED_REQUESTED
    }
}

export function searchPlanetAllowedAC() {
    return {
      type: SEARCH_PLANET_ALLOWED,
      isSearchAllowed: true
    }
}

export function searchPlanetAllowedFailed() {
    return {
      type: SEARCH_PLANET_ALLOWED_FAILED,
      isSearchAllowed: false
    }
}

export const isSearchAllowedFn = () => {
    return dispatch => {
        dispatch(searchPlanetAllowedRequested());

        if(isSearchAllowedService()) {
            dispatch(searchPlanetAllowedAC());
        } else {
            dispatch(searchPlanetAllowedFailed());
        }
    }
}