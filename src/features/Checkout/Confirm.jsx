import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import { clickOnConfirm, cardSelector } from './redux';
import { Table } from '../Cart';
import { numInCartSelector } from '../Cart/redux';
import { AddressDisplay } from '../Address';
import { shippingAddressSelector } from '../Address/redux';

const cx = classnames.bind(styles);
const propTypes = {
  clickOnConfirm: PropTypes.func.isRequired,
  numInCart: PropTypes.integer,
  shippingAddress: PropTypes.object,
};
const mapStateToProps = createSelector(
  numInCartSelector,
  shippingAddressSelector,
  cardSelector,
  (numInCart, shippingAddress, card) => ({
    numInCart,
    shippingAddress,
    card,
  }),
);

const mapDispatchToProps = { clickOnConfirm };

export function Confirm({ numInCart, shippingAddress, card, clickOnConfirm }) {
  return (
    <div className={cx('confirm')}>
      <header>
        <h4>
          You are about to purchase {numInCart} items
        </h4>
        <h5>Please review your cart below.</h5>
      </header>
      <Table />
      <div className={cx('confirm-shipping-billing')}>
        <div>
          <h4>Shipping</h4>
          <AddressDisplay {...shippingAddress} simple />
        </div>
        <div>
          <h4>Billing</h4>
          <p>
            {card.brand} ending in {card.last4}
          </p>
        </div>
      </div>
      <footer className={cx('footer-confirm')}>
        <p>
          Go Commerce is an example front-end for the Headless E-Commerce
          Solution for JAMstack sites. All products and transactions are for
          demonstration purposes of the technology. No goods or services are
          being offered or sold.
        </p>
        <div>
          <p>
            Please do not submit actual credit card numbers. <br /> Stripe test
            credit card numbers are ok to submit.{' '}
          </p>
          <button className={cx('next-button')} onClick={clickOnConfirm}>
            Confirm Purchase
          </button>
        </div>
      </footer>
    </div>
  );
}

Confirm.displayName = 'Confirm';
Confirm.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
