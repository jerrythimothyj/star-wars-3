import { SEARCH_SPECIES_REQUESTED,
  SEARCH_SPECIES,
  SEARCH_SPECIES_FAILED,
  SEARCH_SPECIE_ALLOWED_REQUESTED,
  SEARCH_SPECIE_ALLOWED,
  SEARCH_SPECIE_ALLOWED_FAILED,
  RESET_SEARCH_SPECIE_COUNTER } from '../constants';
import { specieService,
  isSearchAllowedService,
  resetSearchAllowedServiceCounter,
  secondsMax } from '../services';

export function searchSpeciesRequested() {
  return {
    type: SEARCH_SPECIES_REQUESTED,
    loaded: false,
  };
}

export function searchSpeciesAC(specie, species, previous, next, page, format) {
  return {
    type: SEARCH_SPECIES,
    specie,
    species,
    previousAllowed: !!previous,
    nextAllowed: !!next,
    page,
    format,
    loaded: true,
  };
}

export function searchSpeciesFailed() {
  return {
    type: SEARCH_SPECIES_FAILED,
    loaded: true,
  };
}

export const searchSpecies = (specie, page, format) => (dispatch) => {
  dispatch(searchSpeciesRequested());
  dispatch(specieService(specie, page, format));
};

export function searchSpecieAllowedRequested() {
  return {
    type: SEARCH_SPECIE_ALLOWED_REQUESTED,
    loaded: true,
  };
}

export function searchSpecieAllowedAC(specie) {
  return {
    type: SEARCH_SPECIE_ALLOWED,
    specie,
    isSearchAllowed: true,
    loaded: true,
  };
}

export function searchSpecieAllowedFailed(remainingSeconds) {
  return {
    type: SEARCH_SPECIE_ALLOWED_FAILED,
    remainingSeconds,
    isSearchAllowed: false,
    loaded: true,
  };
}

export const isSpecieSearchAllowedFn = specie => (dispatch) => {
  dispatch(searchSpecieAllowedRequested());

  const remainingSeconds = isSearchAllowedService(specie);
  if (remainingSeconds === true) {
    dispatch(searchSpecieAllowedAC(specie));
  } else {
    dispatch(searchSpecieAllowedFailed(remainingSeconds));
  }
};

export function resetSearchSpecieCounter() {
  return {
    type: RESET_SEARCH_SPECIE_COUNTER,
    remainingSeconds: secondsMax,
  };
}

export const resetSearchSpecieCounterFn = () => (dispatch) => {
  dispatch(resetSearchSpecieCounter());
  resetSearchAllowedServiceCounter();
};

