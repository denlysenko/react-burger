import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* fetchIngredients() {
  try {
    const response = yield axios.get('/ingredients.json');

    yield put(actions.fetchIngredientsSuccess(response.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFail());
  }
}
