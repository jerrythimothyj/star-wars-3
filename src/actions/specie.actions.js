import { SEARCH_SPECIES_REQUESTED, SEARCH_SPECIES, SEARCH_SPECIES_FAILED, SEARCH_SPECIE_ALLOWED_REQUESTED, SEARCH_SPECIE_ALLOWED, SEARCH_SPECIE_ALLOWED_FAILED } from '../constants/specie.constants';
import { specieService } from '../services/specie/specie.services';
import { isSearchAllowedService } from '../services/search/search.services'

export function searchSpeciesRequested() {
    return {
      type: SEARCH_SPECIES_REQUESTED,
      loaded: false
    }
}

export function searchSpeciesAC(specie, species, previous, next, page) {
    return {
      type: SEARCH_SPECIES,
      specie,
      species,
      previousAllowed: previous? true: false,
      nextAllowed: next? true: false,
      page,
      loaded: true
    }
}

export function searchSpeciesFailed() {
    return {
      type: SEARCH_SPECIES_FAILED,
      loaded: true
    }
}

export const searchSpecies = (specie, page) => {
    return dispatch => {
        dispatch(searchSpeciesRequested())

        specieService(specie, page).then(speciesData => {
            if(speciesData.results.length > 0) {
                dispatch(searchSpeciesAC(specie, speciesData.results, speciesData.previous, speciesData.next, page))
            } else {
                dispatch(searchSpeciesFailed())
            }
        })
    }
}

export function searchSpecieAllowedRequested() {
    return {
      type: SEARCH_SPECIE_ALLOWED_REQUESTED,
      loaded: true
    }
}

export function searchSpecieAllowedAC(specie) {
    return {
      type: SEARCH_SPECIE_ALLOWED,
      specie,
      isSearchAllowed: true,
      loaded: true
    }
}

export function searchSpecieAllowedFailed() {
    return {
      type: SEARCH_SPECIE_ALLOWED_FAILED,
      isSearchAllowed: false,
      loaded: true
    }
}

export const isSearchAllowedFn = (specie) => {
    return dispatch => {
        dispatch(searchSpecieAllowedRequested());

        if(isSearchAllowedService()) {
            dispatch(searchSpecieAllowedAC(specie));
        } else {
            dispatch(searchSpecieAllowedFailed());
        }
    }
}