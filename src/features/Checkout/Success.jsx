import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import { cardSelector, selectedAddressSelector, orderSelector } from './redux';
import { addressSelector } from '../Address/redux';

const cx = classnames.bind(styles);
const propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  brand: PropTypes.string,
  city: PropTypes.string,
  firstItem: PropTypes.string,
  last4: PropTypes.string,
  numOfItems: PropTypes.number,
};

const mapStateToProps = createSelector(
  addressSelector,
  selectedAddressSelector,
  cardSelector,
  orderSelector,
  (addressMap, addressId, card, order) => {
    const address = addressMap[addressId] || {};
    const isOrderItems = Array.isArray(order.line_items);
    const firstItem = isOrderItems ? order.line_items[0] : {};
    return {
      ...address,
      ...card,
      numOfItems: isOrderItems ? order.line_items.length : 0,
      firstItem: firstItem.title,
    };
  },
);
const mapDispatchToProps = null;

export function Success({
  address1,
  address2,
  brand,
  city,
  firstItem,
  last4,
  numOfItems,
}) {
  return (
    <div className={ cx('checkout') }>
      <header className={ cx('header') }>
        <h4>Success</h4>
      </header>
      <div className={ cx('container') }>
        <header className={ cx('success-header') }>
          <h4>
            Your order of { firstItem }{ ' ' }
            { numOfItems > 1 ? `and ${numOfItems - 1} other item` : '' } has been
            placed.
          </h4>
        </header>
        <hr />
      </div>
      <div>
        <div className={ cx('success-content') }>
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
