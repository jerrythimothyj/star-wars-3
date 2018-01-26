import axios from '../axios/axios-base.service';
import { setSessionStorageItem, removeSessionStorageItem, getSessionStorageItem } from '../storage/storage.services';

export const loginService = (username, password) => axios.get(`people/?search=${username}`)
  .then((response) => {
    if (response &&
                response.data &&
                response.data.results &&
                response.data.results.length === 1 &&
                response.data.results[0].name === username &&
                response.data.results[0].birth_year === password
    ) {
      setSessionStorageItem('loggedInUser', response.data.results[0].name);
      return true;
    }
    return false;
  }, (error) => {
    console.log(error);
    return false;
  });

export const logoutService = () => {
  removeSessionStorageItem('loggedInUser');
  if (!getSessionStorageItem('loggedInUser')) {
    return true;
  }
  return false;
};
