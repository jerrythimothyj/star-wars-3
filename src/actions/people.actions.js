import { SEARCH_PEOPLES_REQUESTED, SEARCH_PEOPLES, SEARCH_PEOPLES_FAILED, SEARCH_PEOPLE_ALLOWED_REQUESTED, SEARCH_PEOPLE_ALLOWED, SEARCH_PEOPLE_ALLOWED_FAILED } from '../constants/people.constants';
import { peopleService } from '../services/people/people.services';
import { isSearchAllowedService } from '../services/search/search.services';

export function searchPeoplesRequested() {
  return {
    type: SEARCH_PEOPLES_REQUESTED,
    loaded: false,
  };
}

export function searchPeoplesAC(people, peoples, previous, next, page) {
  return {
    type: SEARCH_PEOPLES,
    people,
    peoples,
    previousAllowed: !!previous,
    nextAllowed: !!next,
    page,
    loaded: true,
  };
}

export function searchPeoplesFailed() {
  return {
    type: SEARCH_PEOPLES_FAILED,
    loaded: true,
  };
}

export const searchPeoples = (people, page) => (dispatch) => {
  dispatch(searchPeoplesRequested());

  peopleService(people, page).then((peoplesData) => {
    if (peoplesData.results) {
      dispatch(searchPeoplesAC(people, peoplesData.results, peoplesData.previous, peoplesData.next, page));
    } else {
      dispatch(searchPeoplesFailed());
    }
  });
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
