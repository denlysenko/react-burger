import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Orders/CheckoutSummary';
import ContactData from './ContactData';


class Checkout extends Component {
  state = {
    ingredients: null,
    price: null
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (const param of query.entries()) {
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients, price });
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
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelled={this.cancelCheckout}
          continued={this.continueCheckout}
        />

        <Route
          path={`${this.props.match.path}/contact-data`}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
