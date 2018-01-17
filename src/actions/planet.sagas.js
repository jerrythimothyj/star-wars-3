import { SEARCH_PLANETS_REQUESTED, SEARCH_PLANETS, SEARCH_PLANETS_FAILED, SEARCH_PLANET_ALLOWED_REQUESTED, SEARCH_PLANET_ALLOWED, SEARCH_PLANET_ALLOWED_FAILED } from '../constants/planet.constants';
import { call, put } from "redux-saga/effects"
import { planetService } from '../services/planet/planet.services';
import { isSearchAllowedService } from '../services/search/search.services'  
  
function *searchPlanets (planet) {
    try {
        yield put({type: SEARCH_PLANETS_REQUESTED});
        const planets = yield call(planetService, planet);
        if(planets) {
            yield put({type: SEARCH_PLANETS, planet, planets});
        } else {
            yield put({type: SEARCH_PLANETS_FAILED});
        }
    } catch (e) {
        yield put({type: SEARCH_PLANETS_FAILED});
    }
}

function *isSearchAllowedFn () {
    try {
        yield put({type: SEARCH_PLANET_ALLOWED_REQUESTED});
        const response = yield call(isSearchAllowedService);
        if(response) {
            yield put({type: SEARCH_PLANET_ALLOWED, isSearchAllowed: true});
        } else {
            yield put({type: SEARCH_PLANET_ALLOWED_FAILED, isSearchAllowed: false});
        }
    } catch (e) {
        yield put({type: SEARCH_PLANET_ALLOWED_FAILED, isSearchAllowed: false});
    }
}
  
  export {
    searchPlanets,
    isSearchAllowedFn
  };