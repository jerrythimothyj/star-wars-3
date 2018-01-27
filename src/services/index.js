import authUser from './auth/auth.services';
import axiosInstance from './axios/axios-base.service';
import wookieeToEnglish from './data/data.service';
import removeCommas from './math/math.services';
import peopleService from './people/people.services';
import planetService from './planet/planet.services';
import specieService from './specie/specie.services';
import { secondsMax, isSearchAllowedService } from './search/search.services';
import { setSessionStorageItem, removeSessionStorageItem, getSessionStorageItem } from './storage/storage.services';
import { loginService, logoutService } from './user/user.services';

export {
  authUser,
  axiosInstance,
  wookieeToEnglish,
  removeCommas,
  peopleService,
  planetService,
  specieService,
  secondsMax,
  isSearchAllowedService,
  setSessionStorageItem,
  removeSessionStorageItem,
  getSessionStorageItem,
  loginService,
  logoutService,
};
