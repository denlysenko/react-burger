import * as actions from '../actions/types';
import reducer from './auth';

describe('auth reducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      redirectPath: '/'
    });
  });

  it('should store a token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          redirectPath: '/'
        },
        {
          type: actions.AUTH_SUCCESS,
          payload: {
            idToken: 'token',
            localId: 'userID'
          }
        }
      )
    ).toEqual({
      token: 'token',
      userId: 'userID',
      error: null,
      loading: false,
      redirectPath: '/'
    });
  });
});
