import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import Shipping from './Shipping.jsx';
import Billing from './Billing.jsx';
import Confirm from './Confirm.jsx';
import Success from './Success.jsx';

import {
  clickOnBilling,
  clickOnNextConfirm,
  showBillingSelector,
  showConfirmSelector,
  showSuccessSelector,
  selectedAddressSelector,
  cardSelector,
} from './redux';

const cx = classnames.bind(styles);
const propTypes = {
  card: PropTypes.object,
  clickOnBilling: PropTypes.func.isRequired,
  clickOnNextConfirm: PropTypes.func.isRequired,
  selectedAddress: PropTypes.string,
  showBilling: PropTypes.bool,
  showConfirm: PropTypes.bool,
  showSuccess: PropTypes.bool,
};
const mapStateToProps = createSelector(
  cardSelector,
  selectedAddressSelector,
  showBillingSelector,
  showConfirmSelector,
  showSuccessSelector,
  (card, selectedAddress, showBilling, showConfirm, showSuccess) => ({
    card,
    selectedAddress,
    showBilling,
    showConfirm,
    showSuccess,
  }),
);

const mapDispatchToProps = {
  clickOnBilling,
  clickOnNextConfirm,
};

export function Checkout({
  clickOnBilling,
  clickOnNextConfirm,
  card,
  selectedAddress,
  showBilling,
  showConfirm,
  showSuccess,
}) {
  if (showSuccess) {
    return <Success />;
  }
  let View = Shipping;
  let btn = null;
  if (showBilling) {
    View = Billing;
    btn = (
      <button
        className={ cx('next-button') }
        disabled={ !card.id }
        onClick={ clickOnNextConfirm }
        >
        Next: Confirm
      </button>
    );
  } else if (showConfirm) {
    View = Confirm;
  } else {
    btn = (
      <button
        className={ cx('next-button') }
        disabled={ !selectedAddress }
        onClick={ clickOnBilling }
        >
        Next: Billing
      </button>
    );
  }
  return (
    <div className={ cx('checkout') }>
      <header className={ cx('header') }>
        <h4>Check Out</h4>
      </header>
      <div className={ cx('container') }>
        <nav className={ cx('nav') }>
          <ul className={ cx('nav-list') }>
            <li className={ cx({ underline: !showBilling && !showConfirm }) }>
              Address
            </li>
            <li className={ cx({ underline: showBilling && !showConfirm }) }>
              Billing
            </li>
            <li className={ cx({ underline: !showBilling && showConfirm }) }>
              Confirm
            </li>
          </ul>
        </nav>
        <div className={ cx('content') }>
          <View />
          <div className={ cx('footer') }>
            { btn }
          </div>
        </div>
      </div>
    </div>
  );
}
Checkout.displayName = 'Checkout';
Checkout.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
