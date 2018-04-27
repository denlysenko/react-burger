import * as actions from '../actions/types';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_INIT: {
      return {
        ...state,
        purchased: false
      };
    }

    case actions.COMPLETE_ORDER: {
      return {
        ...state,
        loading: true
      };
    }

    case actions.COMPLETE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [...state.orders, action.payload]
      };
    }

    case actions.COMPLETE_ORDER_FAIL: {
      return {
        ...state,
        loading: false
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
