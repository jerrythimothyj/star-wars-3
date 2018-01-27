import { setTimeout } from 'timers';

const secondsMax = 60;
const noOfSearchesMax = 14;
export default secondsMax;
let secondsCtr = secondsMax;
let noOfSearches = 0;

const timer = () => {
  secondsCtr -= 1;

  if (secondsCtr < 0) {
    secondsCtr = secondsMax;
    noOfSearches = 0;
  } else {
    setTimeout(timer, 1000);
  }
};

export const isSearchAllowedService = () => {
  if (secondsCtr === secondsMax || secondsCtr === 0) { timer(); }
  noOfSearches += 1;

  if (
    noOfSearches > noOfSearchesMax &&
          sessionStorage.loggedInUser &&
          sessionStorage.loggedInUser !== 'Luke Skywalker'
  ) {
    return secondsCtr;
  }
  return true;
};

