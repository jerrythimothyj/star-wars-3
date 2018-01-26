import * as actions from './people.actions';
import { SEARCH_PEOPLES_REQUESTED, SEARCH_PEOPLES, SEARCH_PEOPLES_FAILED, SEARCH_PEOPLE_ALLOWED_REQUESTED, SEARCH_PEOPLE_ALLOWED, SEARCH_PEOPLE_ALLOWED_FAILED } from '../constants/people.constants';


describe('people actions', () => {
  it('should create SEARCH_PEOPLES_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLES_REQUESTED,
      loaded: false,
    };
    expect(actions.searchPeoplesRequested()).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLES', () => {
    const expectedAction = {
      type: SEARCH_PEOPLES,
      people: 'lukey',
      peoples: [],
      previousAllowed: false,
      nextAllowed: false,
      page: 1,
      format: '',
      loaded: true,
    };
    expect(actions.searchPeoplesAC('lukey', [], false, false, 1, '')).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLES_FAILED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLES_FAILED,
      loaded: true,
    };
    expect(actions.searchPeoplesFailed()).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLE_ALLOWED_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLE_ALLOWED_REQUESTED,
      loaded: true,
    };
    expect(actions.searchPeopleAllowedRequested()).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLE_ALLOWED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLE_ALLOWED,
      people: 'lukey',
      isSearchAllowed: true,
      loaded: true,
    };
    expect(actions.searchPeopleAllowedAC('lukey')).toEqual(expectedAction);
  });

  it('should create SEARCH_PEOPLE_ALLOWED_REQUESTED', () => {
    const expectedAction = {
      type: SEARCH_PEOPLE_ALLOWED_FAILED,
      remainingSeconds: '3',
      isSearchAllowed: false,
      loaded: true,
    };
    expect(actions.searchPeopleAllowedFailed('3')).toEqual(expectedAction);
  });
});
