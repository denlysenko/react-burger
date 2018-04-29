import * as actions from '../actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
        building: true
      };
    }

    case actions.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
      };
    }

    case actions.FETCH_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        totalPrice: 4,
        error: false,
        building: false
      };
    }

    case actions.FETCH_INGREDIENTS_FAIL: {
      return {
        ...state,
        error: true
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
