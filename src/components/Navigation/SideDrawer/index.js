import React from 'react';

import Aux from '../../../hoc/Aux';
import Logo from '../../Logo';
import Backdrop from '../../UI/Backdrop';
import NavigationItems from '../NavigationItems';
import classes from './styles.css';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.opened) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.opened} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
