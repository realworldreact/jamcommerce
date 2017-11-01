import React from 'react';
import classnames from 'classnames/bind';
import { Elements } from 'react-stripe-elements';

import styles from './checkout.module.styl';
import ViewHeader from './Header.jsx';
import BillingForm from './Billing-Form.jsx';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Billing() {
  return (
    <div className={ cx('billing') }>
      <ViewHeader>Your Credit Card</ViewHeader>
      <div className={ cx('billing-content') }>
        <header>
          <h4>Add Your Card</h4>
        </header>
        <Elements>
          <BillingForm />
        </Elements>
      </div>
    </div>
  );
}

Billing.displayName = 'Billing';
Billing.propTypes = propTypes;
