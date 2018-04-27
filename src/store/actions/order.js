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
