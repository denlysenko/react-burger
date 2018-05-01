import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* saveOrder(action) {
  const { order, token } = action.payload;

  try {
    const response = yield axios.post(`/orders.json?auth=${token}`, order);
    yield put(
      actions.completeOrderSuccess({ ...order, id: response.data.name })
    );
  } catch (err) {
    yield put(actions.completeOrderFail(err));
  }
}

export function* getOrders(action) {
  const { token, userId } = action.payload;

  try {
    const response = yield axios.get(
      `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    );

    const orders = [];

    for (const key in response.data) {
      orders.push({
        ...response.data[key],
        id: key
      });
    }

    yield put(actions.fetchOrdersSuccess(orders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
