import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Spinner from '../../../components/UI/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler';
import { checkValidity } from '../../../shared/validations';
import * as actions from '../../../store/actions';
import classes from './styles.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  inputChangeHandler = (event, name) => {
    const orderForm = { ...this.state.orderForm };
    const updateElem = { ...orderForm[name] };
    updateElem.touched = true;
    updateElem.value = event.target.value;
    updateElem.valid = checkValidity(updateElem.value, updateElem.validation);
    orderForm[name] = updateElem;
    let formIsValid = true;

    for (const el in orderForm) {
      formIsValid = orderForm[el].valid && formIsValid;
    }

    this.setState({ orderForm, formIsValid });
  };

  saveOrder = event => {
    event.preventDefault();

    const orderData = {};

    for (const name in this.state.orderForm) {
      orderData[name] = this.state.orderForm[name].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      userId: this.props.userId,
      orderData
    };

    this.props.completeOrder(order, this.props.token);
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form onSubmit={this.saveOrder}>
          {formElementsArray.map(el => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
              invalid={!el.config.valid}
              changed={event => this.inputChangeHandler(event, el.id)}
            />
          ))}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    price: state.builder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    completeOrder: (order, token) =>
      dispatch(actions.completeOrder({ order, token }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
