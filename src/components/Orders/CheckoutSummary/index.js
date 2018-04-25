import React from 'react';

import Burger from '../../Burger';
import Button from '../../UI/Button';
import classes from './styles.css';

const checkoutSummary = props => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked={props.cancelled}>
      CANCEL
    </Button>
    <Button btnType="Success" clicked={props.continued}>
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
