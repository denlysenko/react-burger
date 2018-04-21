import React from 'react';

import burgerLogo from '../../assets/images/logo.png';
import classes from './styles.css';

const logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="logo" />
  </div>
);

export default logo;
