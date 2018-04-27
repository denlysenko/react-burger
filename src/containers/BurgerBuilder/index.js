import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary';
import Modal from '../../components/UI/Modal';
import Spinner from '../../components/UI/Spinner';
import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(err => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  purchase = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchase = () => {
    this.setState({ purchasing: false });
  };

  continuePurchase = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        cancelled={this.cancelPurchase}
        continued={this.continuePurchase}
      />
    );

    const burger = this.props.ingredients ? (
      <Aux>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          price={this.props.totalPrice}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          disabled={disabledInfo}
          added={this.props.addIngredient}
          removed={this.props.removeIngredient}
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
          {this.props.ingredients ? orderSummary : null}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredientName =>
      dispatch(actions.addIngredient(ingredientName)),
    removeIngredient: ingredientName =>
      dispatch(actions.removeIngredient(ingredientName))
  };
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
