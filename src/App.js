import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Logout from './containers/Auth/Logout';
import BurgerBuilder from './containers/BurgerBuilder';
import Layout from './containers/Layout';
import asyncComponent from './hoc/asyncComponent';
import * as actions from './store/actions';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={asyncAuth} />
            {this.props.isAuthenticated && (
              <Route path="/checkout" component={asyncCheckout} />
            )}
            {this.props.isAuthenticated && (
              <Route path="/orders" component={asyncOrders} />
            )}
            {this.props.isAuthenticated && (
              <Route path="/logout" component={Logout} />
            )}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
