import authUser from './auth.services';
import '../../mock-localstorage';

describe('auth service', () => {
  it('checks whether a user has not logged in', () => {
    expect(authUser()).toEqual(false);
  });

  it('checks whether a user has logged in', () => {
    sessionStorage.loggedInUser = 'Luke Skywalker';
    expect(authUser()).toEqual(true);
  });
});
