import { takeEvery } from 'redux-saga/effects';

import * as actions from '../actions';
import { checkAuthState, doAuth, logout, setAuthTimeout } from './auth';

export function* watchAuth() {
  yield takeEvery(actions.LOGOUT, logout);
  yield takeEvery(actions.AUTH_SET_TIMEOUT, setAuthTimeout);
  yield takeEvery(actions.AUTH, doAuth);
  yield takeEvery(actions.AUTH_CHECK_STATE, checkAuthState);
}
