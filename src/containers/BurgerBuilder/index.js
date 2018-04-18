import React, { Component } from 'react';

import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Aux from '../../hoc/Aux';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

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

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          disabled={disabledInfo}
          added={this.addIngredient}
          removed={this.removeIngredient}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
