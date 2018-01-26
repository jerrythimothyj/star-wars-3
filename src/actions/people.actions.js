import { SEARCH_PEOPLES_REQUESTED, SEARCH_PEOPLES, SEARCH_PEOPLES_FAILED, SEARCH_PEOPLE_ALLOWED_REQUESTED, SEARCH_PEOPLE_ALLOWED, SEARCH_PEOPLE_ALLOWED_FAILED } from '../constants/people.constants';
import peopleService from '../services/people/people.services';
import { isSearchAllowedService } from '../services/search/search.services';


export function searchPeoplesRequested() {
  return {
    type: SEARCH_PEOPLES_REQUESTED,
    loaded: false,
  };
}

export function searchPeoplesAC(people, peoples, previous, next, page, format) {
  return {
    type: SEARCH_PEOPLES,
    people,
    peoples,
    previousAllowed: !!previous,
    nextAllowed: !!next,
    page,
    format,
    loaded: true,
  };
}

export function searchPeoplesFailed() {
  return {
    type: SEARCH_PEOPLES_FAILED,
    loaded: true,
  };
}

export const searchPeoples = (people, page, format) => (dispatch) => {
  dispatch(searchPeoplesRequested());

  // dispatch(peopleService(people, page, format)).then((peoplesData) => {
  //   if (peoplesData.body.results) {
  //     dispatch(searchPeoplesAC(people, peoplesData.body.results, peoplesData.previous, peoplesData.next, page, format));
  //   } else {
  //     dispatch(searchPeoplesFailed());
  //   }
  // });
  dispatch(peopleService(people, page, format));
};

export function searchPeopleAllowedRequested() {
  return {
    type: SEARCH_PEOPLE_ALLOWED_REQUESTED,
    loaded: true,
  };
}

export function searchPeopleAllowedAC(people) {
  return {
    type: SEARCH_PEOPLE_ALLOWED,
    people,
    isSearchAllowed: true,
    loaded: true,
  };
}

export function searchPeopleAllowedFailed(remainingSeconds) {
  return {
    type: SEARCH_PEOPLE_ALLOWED_FAILED,
    remainingSeconds,
    isSearchAllowed: false,
    loaded: true,
  };
}

export const isPeopleSearchAllowedFn = people => (dispatch) => {
  dispatch(searchPeopleAllowedRequested());

  const remainingSeconds = isSearchAllowedService();
  if (remainingSeconds === true) {
    dispatch(searchPeopleAllowedAC(people));
  } else {
    dispatch(searchPeopleAllowedFailed(remainingSeconds));
  }
};
