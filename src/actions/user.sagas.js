import { LOGIN_REQUESTED, LOGIN, LOGOUT_REQUESTED, LOGOUT, LOGIN_FAILED, LOGOUT_FAILED } from '../constants/user.constants';
import { push } from 'react-router-redux'
import { call, put } from "redux-saga/effects"
import { loginService, logoutService } from '../services/user/user.services';
  
  
function *login (username, password) {
    try {
        yield put({type: LOGIN_REQUESTED});
        const response = yield call(loginService, username, password);
        if(response) {
            yield put({type: LOGIN, username, password});
            yield call(push, '/planets');
        } else {
            yield put({type: LOGIN_FAILED});
        }
    } catch (e) {
        yield put({type: LOGIN_FAILED});
    }
}

function *logout () {
    try {
        yield put({type: LOGOUT_REQUESTED});
        const response = yield call(logoutService);
        if(response) {
            yield put({type: LOGOUT, logoutSucceeded: true, logoutFailed: false});
            yield call(push, '/');
        } else {
            yield put({type: LOGOUT_FAILED, logoutSucceeded: false, logoutFailed: true});
        }
    } catch (e) {
        yield put({type: LOGOUT_FAILED, logoutSucceeded: false, logoutFailed: true});
    }
}
  
  export {
    login,
    logout
  };