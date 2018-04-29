import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Auth from './containers/Auth';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Layout from './containers/Layout';
import Orders from './containers/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
        </Layout>
      </div>
    );
  }
}

export default App;
