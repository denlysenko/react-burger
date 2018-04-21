import React from 'react';

import Logo from '../../Logo';
import classes from './styles.css';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo />
    <nav>
      <ul>
        <li>...</li>
      </ul>
    </nav>
  </header>
);

export default toolbar;
