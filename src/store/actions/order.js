import axios from '../../axios-orders';
import * as actions from '../actions/types';

export const completeOrderSuccess = payload => {
  return {
    type: actions.COMPLETE_ORDER_SUCCESS,
    payload
  };
};

export const completeOrderFail = payload => {
  return {
    type: actions.COMPLETE_ORDER_FAIL,
    payload
  };
};

export const completeOrder = () => {
  return {
    type: actions.COMPLETE_ORDER
  };
};

export const initOrder = () => {
  return {
    type: actions.ORDER_INIT
  };
};

export const saveOrder = order => {
  return dispatch => {
    dispatch(completeOrder());

    axios
      .post('/orders.json', order)
      .then(response => {
        dispatch(completeOrderSuccess({ ...order, id: response.data.name }));
      })
      .catch(err => {
        dispatch(completeOrderFail(err));
      });
  };
};

export const fetchOrders = () => {
  return {
    type: actions.FETCH_ORDERS
  };
};

export const fetchOrdersSuccess = payload => {
  return {
    type: actions.FETCH_ORDERS_SUCCESS,
    payload
  };
};

export const fetchOrdersFail = payload => {
  return {
    type: actions.FETCH_ORDERS_FAIL,
    payload
  };
};

export const getOrders = () => {
  return dispatch => {
    dispatch(fetchOrders());

    axios
      .get('/orders.json')
      .then(response => {
        const orders = [];

        for (const key in response.data) {
          orders.push({
            ...response.data[key],
            id: key
          });
        }

        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
