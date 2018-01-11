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
};

export default function AddressList({
  addresses = [],
  clickOnAddress,
  selectedAddress,
}) {
  if (addresses.length === 0) {
    return null;
  }

  return (
    <div className={cx('list')}>
      <ViewHeader>Your Address</ViewHeader>
      <div className={cx('address-container')}>
        {addresses.map(address =>
          <button
            className={cx('list-button')}
            key={address.id}
            onClick={() => clickOnAddress(address.id)}
          >
            {address.id === selectedAddress && 'x'}
            <AddressDisplay {...address} />
          </button>,
        )}
      </div>
    </div>
  );
}
AddressList.displayName = 'AddressList';
AddressList.propTypes = propTypes;
