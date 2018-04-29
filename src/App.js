import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Auth from './containers/Auth';
import Logout from './containers/Auth/Logout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Layout from './containers/Layout';
import Orders from './containers/Orders';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            {this.props.isAuthenticated && (
              <Route path="/checkout" component={Checkout} />
            )}
            {this.props.isAuthenticated && (
              <Route path="/orders" component={Orders} />
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
