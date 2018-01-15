import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import user from '../reducers/user.reducers'
import planet from '../reducers/planet.reducers'


export default combineReducers({
  routing: routerReducer,
  counter,
  user,
  planet
})