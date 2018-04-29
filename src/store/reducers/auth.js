import * as actions from '../actions/types';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case actions.AUTH_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.idToken,
        userId: action.payload.localId,
        error: null
      };
    }

    case actions.AUTH_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case actions.LOGOUT: {
      return {
        ...state,
        ...initialState
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
