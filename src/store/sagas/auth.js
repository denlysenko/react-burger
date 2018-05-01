import axios from 'axios';
import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* logout(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
}

export function* setAuthTimeout(action) {
  yield delay(action.payload * 1000);
  yield put(actions.logout());
}

export function* doAuth(action) {
  const { email, password, isSignup } = action.payload;

  const body = {
    email,
    password,
    returnSecureToken: true
  };

  const url = isSignup
    ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBi_d5IYc8iX57whOQTBCUXCuvlTNLSEBo'
    : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBi_d5IYc8iX57whOQTBCUXCuvlTNLSEBo';

  try {
    const response = yield axios.post(url, body);

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data));
    yield put(actions.setAuthTimeout(response.data.expiresIn));
  } catch (error) {
    console.error(error.response.data.error);
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* checkAuthState(action) {
  const idToken = localStorage.getItem('token');

  if (!idToken) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate > new Date()) {
      const localId = localStorage.getItem('userId');
      yield put(actions.authSuccess({ idToken, localId }));
      yield put(
        actions.setAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.logout());
    }
  }
}
