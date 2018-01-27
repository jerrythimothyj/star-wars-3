import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from '../reducers/user.reducers';
import planet from '../reducers/planet.reducers';
import people from '../reducers/people.reducers';
import specie from '../reducers/specie.reducers';

export default combineReducers({
  routing: routerReducer,
  user,
  planet,
  people,
  specie,
});
