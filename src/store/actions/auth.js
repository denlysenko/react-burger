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

export const doAuth = (email, password) => {
  return dispatch => {
    dispatch(auth());
  };
};
