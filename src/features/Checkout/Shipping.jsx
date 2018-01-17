import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import AddressList from './Address-List.jsx';
import AddAddress from '../Address/Add-Address.jsx';
import { clickOnAddress } from './redux';
import { addressSelector, selectedAddressSelector } from '../Address/redux';

const cx = classnames.bind(styles);
const propTypes = {
  addresses: PropTypes.array,
  selectedAddress: PropTypes.string,
  clickOnAddress: PropTypes.func.isRequired,
  isAddressListEmpty: PropTypes.bool,
};
const mapStateToProps = createSelector(
  addressSelector,
  selectedAddressSelector,
  (addressMap, selectedAddress) => ({
    addresses: _.map(addressMap, _.identity),
    selectedAddress,
    isAddressListEmpty: _.isEmpty(addressMap),
  }),
);

const mapDispatchToProps = {
  clickOnAddress,
};

export function Shipping({ addresses, selectedAddress, clickOnAddress }) {
  return (
    <div className={cx('shipping')}>
      <AddressList
        addresses={addresses}
        clickOnAddress={clickOnAddress}
        selectedAddress={selectedAddress}
      />
      <div className={cx('shipping-content')}>
        <AddAddress />
      </div>
    </div>
  );
}
Shipping.displayName = 'Shipping';
Shipping.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
