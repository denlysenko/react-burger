import React from 'react';

import classes from './styles.css';

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button type="button" className={classes.Less}>
      Less
    </button>
    <button type="button" className={classes.More}>
      More
    </button>
  </div>
);

export default buildControl;
