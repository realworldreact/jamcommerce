import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './checkout.module.styl';
import { AddressDisplay } from '../Address';

const cx = classnames.bind(styles);
const propTypes = {
  addresses: PropTypes.array,
};

export default function AddressList({ addresses = [] }) {
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
            <AddressDisplay
              key={ address.id }
              { ...address }
            />
          ),
        ) }
      </div>
    </div>
  );
}
AddressList.displayName = 'AddressList';
AddressList.propTypes = propTypes;
