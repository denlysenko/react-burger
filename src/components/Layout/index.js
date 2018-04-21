import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import SideDrawer from '../Navigation/SideDrawer';
import Toolbar from '../Navigation/Toolbar';
import classes from './styles.css';

class Layout extends Component {
  state = {
    sideDrawerVisible: false
  };

  toggleSideDrawer = () => {
    this.setState(prevState => {
      return {
        sideDrawerVisible: !prevState.sideDrawerVisible
      };
    });
  };

  closeSideDrawer = () => {
    this.setState({ sideDrawerVisible: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.toggleSideDrawer} />
        <SideDrawer
          opened={this.state.sideDrawerVisible}
          closed={this.closeSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
