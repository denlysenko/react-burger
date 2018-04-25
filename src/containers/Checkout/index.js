import React, { Component } from 'react';

import CheckoutSummary from '../../components/Orders/CheckoutSummary';


class Checkout extends Component {
  state = {
    ingredients: null
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (const param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }

    this.setState({ ingredients });
  }

  cancelCheckout = () => {
    this.props.history.goBack();
  };

  continueCheckout = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        {this.state.ingredients && (
          <CheckoutSummary
            ingredients={this.state.ingredients}
            cancelled={this.cancelCheckout}
            continued={this.continueCheckout}
          />
        )}
      </div>
    );
  }
}

export default Checkout;
