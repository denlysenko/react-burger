import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Orders/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
  cancelCheckout = () => {
    this.props.history.goBack();
  };

  continueCheckout = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return this.props.ingredients ? (
      <div>
        {this.props.purchased ? <Redirect to="/" /> : null}
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancelled={this.cancelCheckout}
          continued={this.continueCheckout}
        />

        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
