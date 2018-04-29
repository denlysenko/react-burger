import axios from 'axios';

import * as actions from './types';

export const auth = () => {
  return {
    type: actions.AUTH
  };
};

export const authSuccess = payload => {
  return {
    type: actions.AUTH_SUCCESS,
    payload
  };
};

export const authFail = payload => {
  return {
    type: actions.AUTH_FAIL,
    payload
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actions.LOGOUT
  };
};

export const setAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const doAuth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(auth());

    const body = {
      email,
      password,
      returnSecureToken: true
    };

    const url = isSignup
      ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBi_d5IYc8iX57whOQTBCUXCuvlTNLSEBo'
      : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBi_d5IYc8iX57whOQTBCUXCuvlTNLSEBo';

    axios
      .post(url, body)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(setAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        console.error(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const idToken = localStorage.getItem('token');

    if (!idToken) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate > new Date()) {
        const localId = localStorage.getItem('userId');
        dispatch(authSuccess({ idToken, localId }));
        dispatch(
          setAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};

export const setRedirectPath = payload => {
  return {
    type: actions.SET_REDIRECT_PATH,
    payload
  };
};
