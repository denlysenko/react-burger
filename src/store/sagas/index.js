import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actions from '../actions';
import { checkAuthState, doAuth, logout, setAuthTimeout } from './auth';
import { fetchIngredients } from './burgerBuilder';
import { getOrders, saveOrder } from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actions.LOGOUT, logout),
    takeEvery(actions.AUTH_SET_TIMEOUT, setAuthTimeout),
    takeEvery(actions.AUTH, doAuth),
    takeEvery(actions.AUTH_CHECK_STATE, checkAuthState)
  ]);
}

export function* watchBuilder() {
  yield takeEvery(actions.FETCH_INGREDIENTS, fetchIngredients);
}

export function* watchOrder() {
  yield takeEvery(actions.FETCH_ORDERS, getOrders);
  yield takeLatest(actions.COMPLETE_ORDER, saveOrder);
}
