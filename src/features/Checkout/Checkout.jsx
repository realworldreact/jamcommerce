import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import Shipping from './Shipping.jsx';
import {
  clickOnBilling,
  showBillingSelector,
  selectedAddressSelector,
} from './redux';

const cx = classnames.bind(styles);
const propTypes = {
  clickOnBilling: PropTypes.func.isRequired,
  selectedAddress: PropTypes.string,
  showBilling: PropTypes.bool,
};
const mapStateToProps = createSelector(
  showBillingSelector,
  selectedAddressSelector,
  (showBilling, selectedAddress) => ({
    showBilling,
    selectedAddress,
  }),
);

const mapDispatchToProps = {
  clickOnBilling,
};

export function Checkout({ clickOnBilling, selectedAddress, showBilling }) {
  let View = Shipping;
  if (showBilling) {
    View = 'foo';
  }
  return (
    <div className={ cx('checkout') }>
      <header className={ cx('header') }>
        <h4>Check Out</h4>
      </header>
      <div className={ cx('container') }>
        <nav className={ cx('nav') }>
          <ul className={ cx('nav-list') }>
            <li className={ cx({ underline: !showBilling }) }>Address</li>
            <li className={ cx({ underline: showBilling }) }>Billing</li>
            <li>Confirm</li>
          </ul>
        </nav>
        <div className={ cx('content') }>
          <View />
          <div className={ cx('footer') }>
            { !showBilling &&
              <button
                className={ cx('next-button') }
                disabled={ !selectedAddress }
                onClick={ clickOnBilling }
                >
                Next: Billing
              </button> }
          </div>
        </div>
      </div>
    </div>
  );
}
Checkout.displayName = 'Checkout';
Checkout.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
