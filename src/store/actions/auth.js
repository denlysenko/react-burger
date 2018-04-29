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
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(authFail(error));
      });
  };
};
