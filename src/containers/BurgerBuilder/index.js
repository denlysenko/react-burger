import React, { Component } from 'react';

import axios from '../../axios-orders';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary';
import Modal from '../../components/UI/Modal';
import Spinner from '../../components/UI/Spinner';
import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  purchase = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchase = () => {
    this.setState({ purchasing: false });
  };

  continuePurchase = () => {
    const queryParams = [];

    for (const key in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
          this.state.ingredients[key]
        )}`
      );
    }

    queryParams.push(`price=${this.state.totalPrice}`);

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryParams.join('&')}`
    });
  };

  addIngredient = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const totalPrice = INGREDIENT_PRICES[type] + oldPrice;
    this.setState({ totalPrice, ingredients });
    this.updatePurchaseState(ingredients);
  };

  removeIngredient = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const totalPrice = oldPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice, ingredients });
    this.updatePurchaseState(ingredients);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        cancelled={this.cancelPurchase}
        continued={this.continuePurchase}
      />
    );

    const burger = this.state.ingredients ? (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          disabled={disabledInfo}
          added={this.addIngredient}
          removed={this.removeIngredient}
          ordered={this.purchase}
        />
      </Aux>
    ) : this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchase}>
          {this.state.ingredients ? orderSummary : null}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
