import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';
import { navigateTo } from 'gatsby-link';

import styles from './checkout.module.styl';
import Shipping from './Shipping.jsx';
import Billing from './Billing.jsx';
import Confirm from './Confirm.jsx';
import Success from './Success.jsx';

import {
  cardSelector,
  clickOnBilling,
  clickOnNextConfirm,
  didMountWithoutAuth,
  selectedAddressSelector,
  showBillingSelector,
  showConfirmSelector,
  showSuccessSelector,
  willUnmount,
} from './redux';
import { isSignedInSelector } from '../Auth/redux';

const cx = classnames.bind(styles);
const propTypes = {
  card: PropTypes.object,
  clickOnBilling: PropTypes.func.isRequired,
  clickOnNextConfirm: PropTypes.func.isRequired,
  didMountWithoutAuth: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  selectedAddress: PropTypes.string,
  showBilling: PropTypes.bool,
  showConfirm: PropTypes.bool,
  showSuccess: PropTypes.bool,
  willUnmount: PropTypes.func.isRequired,
};
const mapStateToProps = createSelector(
  cardSelector,
  selectedAddressSelector,
  showBillingSelector,
  showConfirmSelector,
  showSuccessSelector,
  isSignedInSelector,
  (
    card,
    selectedAddress,
    showBilling,
    showConfirm,
    showSuccess,
    isSignedIn,
  ) => ({
    card,
    isSignedIn,
    selectedAddress,
    showBilling,
    showConfirm,
    showSuccess,
  }),
);

const mapDispatchToProps = {
  clickOnBilling,
  clickOnNextConfirm,
  didMountWithoutAuth,
  willUnmount,
};

export class Checkout extends Component {
  componentDidMount() {
    const { didMountWithoutAuth, isSignedIn } = this.props;
    if (!isSignedIn) {
      didMountWithoutAuth();
      navigateTo('/signin');
    }
  }
  componentWillUnmount() {
    this.props.willUnmount();
  }

  render() {
    const {
      clickOnBilling,
      clickOnNextConfirm,
      card,
      selectedAddress,
      showBilling,
      showConfirm,
      showSuccess,
    } = this.props;
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
}

Checkout.displayName = 'Checkout';
Checkout.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
