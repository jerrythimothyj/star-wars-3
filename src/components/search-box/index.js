import React from 'react';
import { setTimeout, clearTimeout } from 'timers';

let secondsCtr;
let localTimer = null;
const timer = () => {
  secondsCtr -= 1;
  if (document.querySelector('#secondsCtr')) {
    document.querySelector('#secondsCtr').innerHTML = secondsCtr;
  }

  if (secondsCtr === 0) {
    clearTimeout(localTimer);
  } else {
    localTimer = setTimeout(timer, 1000);
  }
};

function SearchBox(props) {
  const {
    toSearch, isWookie, searchKey, searchBox, handleChange, isSearchAllowed, remainingSeconds,
  } = props;
  secondsCtr = remainingSeconds;
  if (!isSearchAllowed) { timer(); }
  return (
    <div>
      <div className="row">
        <div className="col"><h1>{toSearch}</h1></div>
        <div className="col text-right">
            Wookiee<br />
          <label htmlFor="wookiee" className="switch">
            <input type="checkbox" name="wookiee" id="wookiee" onClick={e => isWookie(e)} />
            <span className="slider round" />
          </label>
        </div>
      </div>
      <form name="form">
        <input
          type="text"
          className="form-control"
          name={searchBox}
          value={searchKey}
          onChange={e => handleChange(e)}
          disabled={!isSearchAllowed}
        />
        {!isSearchAllowed &&
          <h3>Please wait for <span id="secondsCtr">{secondsCtr}</span> seconds</h3>}
      </form>
    </div>
  );
}

export default SearchBox;
