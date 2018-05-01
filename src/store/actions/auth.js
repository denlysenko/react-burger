import * as actions from './types';

export const auth = payload => {
  return {
    type: actions.AUTH,
    payload
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
  return {
    type: actions.LOGOUT
  };
};

export const setAuthTimeout = payload => {
  return {
    type: actions.AUTH_SET_TIMEOUT,
    payload
  };
};

export const checkAuthState = () => {
  return {
    type: actions.AUTH_CHECK_STATE
  };
};

export const setRedirectPath = payload => {
  return {
    type: actions.SET_REDIRECT_PATH,
    payload
  };
};
