import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import Layout from './containers/Layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
