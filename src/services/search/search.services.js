import { setTimeout, clearTimeout } from 'timers';

export const secondsMax = 60;
const noOfSearchesMax = 2;
let secondsCtr = secondsMax;
let noOfSearches = 0;
let timerSearchService = null;

const timer = () => {
  secondsCtr -= 1;
  if (secondsCtr < 0) {
    secondsCtr = secondsMax;
    noOfSearches = 0;
    clearTimeout(timerSearchService);
  } else {
    console.log('else block', secondsCtr);
    timerSearchService = setTimeout(timer, 1000);
  }
};

export const isSearchAllowedService = (searchKey) => {
  if (secondsCtr === secondsMax || secondsCtr === 0) { timer(); }
  if (searchKey && searchKey.length > 0) {
    noOfSearches += 1;
  }
  if (
    noOfSearches > noOfSearchesMax &&
          sessionStorage.loggedInUser &&
          sessionStorage.loggedInUser !== 'Luke Skywalker'
  ) {
    return secondsCtr;
  }
  return true;
};

export const resetSearchAllowedServiceCounter = () => {
  noOfSearches = 0;
  secondsCtr = 0;
  clearTimeout(timerSearchService);
};

