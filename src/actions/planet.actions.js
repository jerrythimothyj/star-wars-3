import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants/planet.constants';
import { planetService } from '../services/planet/planet.services';
import { isSearchAllowedService } from '../services/search/search.services'

export function searchPlanetsRequested() {
    return {
      type: SEARCH_PLANETS_REQUESTED,
      loaded: false
    }
}

export function searchPlanetsAC(planet, planets) {
    return {
      type: SEARCH_PLANETS,
      planet,
      planets,
      loaded: true
    }
}

export function searchPlanetsFailed() {
    return {
      type: SEARCH_PLANETS_FAILED,
      loaded: true
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
      type: SEARCH_PLANET_ALLOWED_REQUESTED,
      loaded: true
    }
}

export function searchPlanetAllowedAC(planet) {
    return {
      type: SEARCH_PLANET_ALLOWED,
      planet,
      isSearchAllowed: true,
      loaded: true
    }
}

export function searchPlanetAllowedFailed() {
    return {
      type: SEARCH_PLANET_ALLOWED_FAILED,
      isSearchAllowed: false,
      loaded: true
    }
}

export const isSearchAllowedFn = (planet) => {
    return dispatch => {
        dispatch(searchPlanetAllowedRequested());

        if(isSearchAllowedService()) {
            dispatch(searchPlanetAllowedAC(planet));
        } else {
            dispatch(searchPlanetAllowedFailed());
        }
    }
}