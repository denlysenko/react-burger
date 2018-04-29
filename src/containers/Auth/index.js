import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import * as actions from '../../store/actions';
import classes from './styles.css';


class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event, name) => {
    const controls = {
      ...this.state.controls,
      [name]: {
        ...this.state.controls[name],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[name].validation
        ),
        touched: true
      }
    };

    this.setState({ controls });
  };

  submit = event => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    this.props.authenticate(email.value, password.value, this.state.isSignup);
  };

  switchAuthMode = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submit}>
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
          <Button btnType="Success">SUBMIT</Button>
          <Button type="button" btnType="Danger" clicked={this.switchAuthMode}>
            SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email, password, isSignup) =>
      dispatch(actions.doAuth(email, password, isSignup))
  };
};

export default connect(null, mapDispatchToProps)(Auth);