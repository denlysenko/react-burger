import React from 'react';

import Burger from '../../Burger';
import Button from '../../UI/Button';
import classes from './styles.css';

const checkoutSummary = props => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredient} />
    </div>
    <Button btnType="Danger" clicked>
      CANCEL
    </Button>
    <Button btnType="Succes" clicked>
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
