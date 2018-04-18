import React from 'react';

import BuildControl from '../BuildControl';
import classes from './styles.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
        added={() => props.added(ctrl.type)}
        removed={() => props.removed(ctrl.type)}
      />
    ))}
  </div>
);

export default buildControls;
