import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';

import styles from './address.module.styl';
import AddressDisplay from './Display';
import { addressSelector, editAddress, deleteAddress } from './redux';
import ViewHeader from './Header.jsx';
import AddAddress from './Add-Address';

const cx = classnames.bind(styles);
const propTypes = {
  addresses: PropTypes.array,
  editAddress: PropTypes.func,
  deleteAddress: PropTypes.func,
};

const mapStateToProps = createSelector(addressSelector, addressMap => ({
  addresses: Object.values(addressMap)
    .filter(v => v)
    .filter(v => v.hasOwnProperty('address1')),
}));

const mapDispatchToProps = {
  editAddress,
  deleteAddress,
};

function AddressList({ addresses = [], editAddress, deleteAddress }) {
  if (addresses.length > 0) {
    return (
      <div>
        <AddAddress />
        <ViewHeader>Your Addresses</ViewHeader>
        <div className={cx('list')}>
          <div className={cx('address-container')}>
            {addresses.map(address =>
              <div key={address.id}>
                <AddressDisplay {...address} selected={false} simple={true} />
                <div className={cx('address-controls')}>
                  <button onClick={() => editAddress(address.id)}>Edit</button>
                  <button onClick={() => deleteAddress(address.id)}>
                    Delete
                  </button>
                </div>
              </div>,
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <AddAddress />
      </div>
    );
  }
}
AddressList.displayName = 'AddressList';
AddressList.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
