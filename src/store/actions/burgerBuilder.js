import axios from '../../axios-orders';
import * as actions from './types';

export const addIngredient = payload => {
  return {
    type: actions.ADD_INGREDIENT,
    payload
  };
};

export const removeIngredient = payload => {
  return {
    type: actions.REMOVE_INGREDIENT,
    payload
  };
};

export const fetchIngredientsSuccess = payload => {
  return {
    type: actions.FETCH_INGREDIENTS_SUCCESS,
    payload
  };
};

export const fetchIngredientsFail = () => {
  return {
    type: actions.FETCH_INGREDIENTS_FAIL
  };
};

export const fetchIngredients = () => {
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(response => {
        dispatch(fetchIngredientsSuccess(response.data));
      })
      .catch(() => {
        dispatch(fetchIngredientsFail());
      });
  };
};
