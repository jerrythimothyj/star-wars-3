import { SEARCH_SPECIES_REQUESTED, SEARCH_SPECIES, SEARCH_SPECIES_FAILED, SEARCH_SPECIE_ALLOWED_REQUESTED, SEARCH_SPECIE_ALLOWED, SEARCH_SPECIE_ALLOWED_FAILED } from '../constants/specie.constants';
import specieService from '../services/specie/specie.services';
import { isSearchAllowedService } from '../services/search/search.services';

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

  // specieService(specie, page, format).then((speciesData) => {
  //   if (speciesData.results) {
  //     dispatch(searchSpeciesAC(specie, speciesData.results, speciesData.previous, speciesData.next, page, format));
  //   } else {
  //     dispatch(searchSpeciesFailed());
  //   }
  // });
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

  const remainingSeconds = isSearchAllowedService();
  if (remainingSeconds === true) {
    dispatch(searchSpecieAllowedAC(specie));
  } else {
    dispatch(searchSpecieAllowedFailed(remainingSeconds));
  }
};
