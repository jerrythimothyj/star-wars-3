import { push } from 'react-router-redux';
import axiosInstance from '../axios/axios-base.service';
import { setSessionStorageItem, removeSessionStorageItem, getSessionStorageItem } from '../index';
import * as actions from '../../actions';

export const loginService = (username, password) => dispatch => axiosInstance.get(`people/?search=${username}`)
  .then((response) => {
    if (response &&
                response.data &&
                response.data.results &&
                response.data.results.length === 1 &&
                response.data.results[0].name === username &&
                response.data.results[0].birth_year === password
    ) {
      setSessionStorageItem('loggedInUser', response.data.results[0].name);
      dispatch(actions.loginAC(username, password));
      dispatch(push('/planets'));
    } else {
      dispatch(actions.loginFailed());
    }
  }, () => {
    dispatch(actions.loginFailed());
  });

export const logoutService = () => (dispatch) => {
  removeSessionStorageItem('loggedInUser');
  if (!getSessionStorageItem('loggedInUser')) {
    dispatch(actions.logoutAC());
    dispatch(push('/'));
  } else {
    dispatch(actions.logoutFailed());
  }
};
