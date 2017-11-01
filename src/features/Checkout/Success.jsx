import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import { selectedCardSelector, selectedAddressSelector } from './redux';
import { addressSelector } from '../Address/redux';
import { cardMapSelector } from '../Card/redux';

const cx = classnames.bind(styles);
const propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  brand: PropTypes.string,
  city: PropTypes.string,
  last4: PropTypes.string,
};

const mapStateToProps = createSelector(
  addressSelector,
  selectedAddressSelector,
  cardMapSelector,
  selectedCardSelector,
  (addressMap, addressId, cardMap, cardId) => {
    const address = addressMap[addressId] || {};
    const card = cardMap[cardId] || {};
    return {
      ...address,
      ...card,
    };
  },
);
const mapDispatchToProps = null;

export function Success({ address1, address2, brand, city, last4 }) {
  return (
    <div className={ cx('checkout') }>
      <header className={ cx('header') }>
        <h4>Success</h4>
      </header>
      <div className={ cx('container') }>
        <header>
          <h4>Your order of React and 1 other item has been placed.</h4>
        </header>
        <hr />
      </div>
      <div>
        <div className={ cx('content') }>
          <p>
            We’ll be shipping your goods to { address1 }, { address2 } in { city }.
            You paid with your { brand } ending in { last4 }.
          </p>
          <p>
            Please check your email account on file for your receipt and order
            confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}

Success.displayName = 'Success';
Success.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Success);
