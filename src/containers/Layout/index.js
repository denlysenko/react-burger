import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar';
import Aux from '../../hoc/Aux';
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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.toggleSideDrawer}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          opened={this.state.sideDrawerVisible}
          closed={this.closeSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

export default connect(mapStateToProps)(Layout);
