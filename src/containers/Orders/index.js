import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Orders';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.token);
  }

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: token => dispatch(actions.getOrders(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
