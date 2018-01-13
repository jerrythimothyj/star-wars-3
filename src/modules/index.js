import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import user from '../reducers/user.reducers'


export default combineReducers({
  routing: routerReducer,
  counter,
  user
})