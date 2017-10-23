import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './checkout.module.styl';
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
    <div className={ cx('address-list') }>
      <header>
        <h4>Your Addresses</h4>
      </header>
      <div className={ cx('address-container') }>
        { addresses.map(address =>
          (
            <button
              className={ cx('address-box') }
              key={ address.id }
              onClick={ () => clickOnAddress(address.id) }
              >
              { address.id === selectedAddress && 'x' }
              <AddressDisplay { ...address } />
            </button>
          ),
        ) }
      </div>
    </div>
  );
}
AddressList.displayName = 'AddressList';
AddressList.propTypes = propTypes;
