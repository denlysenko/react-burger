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
