import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Orders';
import withErrorHandler from '../../hoc/withErrorHandler';


class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
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

        this.setState({ loading: false, orders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);
