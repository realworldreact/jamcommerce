import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';

import styles from './address.module.styl';
import AddressDisplay from './Display';
import { addressSelector } from './redux';
import ViewHeader from './Header.jsx';
import AddAddress from './Add-Address';

const cx = classnames.bind(styles);
const propTypes = {
  addresses: PropTypes.array,
};

const mapStateToProps = createSelector(addressSelector, addressMap => ({
  addresses: _.map(addressMap, _.identity),
}));

const mapDispatchToProps = null;

function AddressList({ addresses = [] }) {
  if (addresses.length === 0) {
    return null;
  }

  return (
    <div>
      <AddAddress />
      <ViewHeader>Your Addresses</ViewHeader>
      <div className={cx('list')}>
        <div className={cx('address-container')}>
          {addresses.map(address =>
            <AddressDisplay
              {...address}
              key={address.id}
              selected={false}
              simple={true}
            />,
          )}
        </div>
      </div>
    </div>
  );
}
AddressList.displayName = 'AddressList';
AddressList.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
