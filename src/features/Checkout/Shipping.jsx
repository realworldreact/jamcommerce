import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './checkout.module.styl';
import AddressList from './Address-List.jsx';
import AddAddress from './Add-Address.jsx';
import {
  clickOnAddAddress,
  clickOnCancelAddAddress,
  submitNewAddress,
  showAddAddressSelector,
} from './redux';
import { addressSelector } from '../Address/redux';

const cx = classnames.bind(styles);
const propTypes = {
  addresses: PropTypes.array,
  clickOnAddAddress: PropTypes.func.isRequired,
  clickOnCancelAddAddress: PropTypes.func.isRequired,
  isAddressListEmpty: PropTypes.bool,
  showAddAddress: PropTypes.bool,
  submitNewAddress: PropTypes.func.isRequired,
};
const mapStateToProps = createSelector(
  addressSelector,
  showAddAddressSelector,
  (addressMap, showAddAddress) => ({
    addresses: _.map(addressMap, _.identity),
    isAddressListEmpty: _.isEmpty(addressMap),
    showAddAddress: _.isEmpty(addressMap) || showAddAddress,
  }),
);

const mapDispatchToProps = {
  clickOnAddAddress,
  clickOnCancelAddAddress,
  submitNewAddress,
};

export function Shipping({
  addresses,
  clickOnAddAddress,
  clickOnCancelAddAddress,
  isAddressListEmpty,
  showAddAddress,
  submitNewAddress,
}) {
  return (
    <div className={ cx('shipping') }>
      <AddressList addresses={ addresses } />
      <div className={ cx('shipping-content') }>
        { !showAddAddress &&
        <button onClick={ clickOnAddAddress }>Add Address</button> }
        { showAddAddress && <AddAddress handleSubmit={ submitNewAddress } /> }
        { showAddAddress &&
            !isAddressListEmpty &&
            <button onClick={ clickOnCancelAddAddress }>Cancel</button> }
      </div>
    </div>
  );
}
Shipping.displayName = 'Shipping';
Shipping.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
