import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './checkout.module.styl';
import ViewHeader from './Header.jsx';
import { AddressDisplay } from '../Address';

const cx = classnames.bind(styles);
const propTypes = {
  addresses: PropTypes.array,
  clickOnAddress: PropTypes.func,
  selectedAddress: PropTypes.string,
  editAddress: PropTypes.func,
  deleteAddress: PropTypes.func,
};

export default function AddressList({
  addresses = [],
  clickOnAddress,
  selectedAddress,
  editAddress,
  deleteAddress,
}) {
  if (addresses.length === 0) {
    return null;
  }

  return (
    <div className={cx('list')}>
      <ViewHeader>Your Address</ViewHeader>
      <div className={cx('address-container')}>
        {addresses.map(address =>
          <div key={address.id} className={cx('address-subcontainer')}>
            <button
              className={cx('list-button')}
              onClick={() => clickOnAddress(address.id)}
            >
              <AddressDisplay
                {...address}
                selected={address.id === selectedAddress}
              />
            </button>
            <div className={cx('address-controls')}>
              <button onClick={() => editAddress(address.id)}>Edit</button>
              <button onClick={() => deleteAddress(address.id)}>Delete</button>
            </div>
          </div>,
        )}
      </div>
    </div>
  );
}
AddressList.displayName = 'AddressList';
AddressList.propTypes = propTypes;
