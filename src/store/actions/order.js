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

export const completeOrder = payload => {
  return {
    type: actions.COMPLETE_ORDER,
    payload
  };
};

export const initOrder = () => {
  return {
    type: actions.ORDER_INIT
  };
};

export const fetchOrders = payload => {
  return {
    type: actions.FETCH_ORDERS,
    payload
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
