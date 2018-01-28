import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED, RESET_SEARCH_PLANET_COUNTER } from '../constants';
import { planetService, isSearchAllowedService, resetSearchAllowedServiceCounter, secondsMax } from '../services';

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
  dispatch(planetService(planet, page, format));
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

  const remainingSeconds = isSearchAllowedService(planet);
  if (remainingSeconds === true) {
    dispatch(searchPlanetAllowedAC(planet));
  } else {
    dispatch(searchPlanetAllowedFailed(remainingSeconds));
  }
};

export function resetSearchPlanetCounter() {
  return {
    type: RESET_SEARCH_PLANET_COUNTER,
    remainingSeconds: secondsMax,
  };
}

export const resetSearchPlanetCounterFn = () => (dispatch) => {
  dispatch(resetSearchPlanetCounter());
  resetSearchAllowedServiceCounter();
};

