import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants/planet.constants';
import { planetService } from '../services/planet/planet.services';
import { isSearchAllowedService } from '../services/search/search.services';

export function searchPlanetsRequested() {
  return {
    type: SEARCH_PLANETS_REQUESTED,
    loaded: false,
  };
}

export function searchPlanetsAC(planet, planets, previous, next, page, format) {
  return {
    type: SEARCH_PLANETS,
    planet,
    planets,
    previousAllowed: !!previous,
    nextAllowed: !!next,
    page,
    format,
    loaded: true,
  };
}

export function searchPlanetsFailed() {
  return {
    type: SEARCH_PLANETS_FAILED,
    loaded: true,
  };
}

export const searchPlanets = (planet, page, format) => (dispatch) => {
  dispatch(searchPlanetsRequested());

  dispatch(planetService(planet, page, format)).then((planetsData) => {
    if (planetsData.results) {
      dispatch(searchPlanetsAC(planet, planetsData.results, planetsData.previous, planetsData.next, page, format));
    } else {
      dispatch(searchPlanetsFailed());
    }
  });
};

export function searchPlanetAllowedRequested() {
  return {
    type: SEARCH_PLANET_ALLOWED_REQUESTED,
    loaded: true,
  };
}

export function searchPlanetAllowedAC(planet) {
  return {
    type: SEARCH_PLANET_ALLOWED,
    planet,
    isSearchAllowed: true,
    loaded: true,
  };
}

export function searchPlanetAllowedFailed(remainingSeconds) {
  return {
    type: SEARCH_PLANET_ALLOWED_FAILED,
    remainingSeconds,
    isSearchAllowed: false,
    loaded: true,
  };
}

export const isPlanetSearchAllowedFn = planet => (dispatch) => {
  dispatch(searchPlanetAllowedRequested());

  const remainingSeconds = isSearchAllowedService();
  if (remainingSeconds === true) {
    dispatch(searchPlanetAllowedAC(planet));
  } else {
    dispatch(searchPlanetAllowedFailed(remainingSeconds));
  }
};
