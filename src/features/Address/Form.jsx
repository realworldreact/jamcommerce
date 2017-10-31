import React from 'react';
// import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './address-display.module.styl';
import Input from '../Input';

const cx = classnames.bind(styles);
const propTypes = {};

export default function AddressForm() {
  return (
    <div className={ cx('address-form') }>
      <Input
        label='Name'
        messages={ {
          length: 'Name should be at least 6 characters',
          required: 'Name is required',
        } }
        model='.name'
        type='text'
        validators={ {
          length: (val = '') => val.length > 6,
          required: (val = '') => val.length,
        } }
      />
      <Input
        label='Street Address'
        messages={ {
          required: 'Address is required',
        } }
        model='.address1'
        type='text'
        validators={ {
          required: (val = '') => val.length,
        } }
      />
      <Input
        label='Apt'
        model='.address2'
        type='text'
      />
      <Input
        label='City'
        model='.city'
        type='text'
      />
      <Input
        label='State'
        model='.state'
        type='text'
      />
      <Input
        label='Zip Code'
        model='.zip'
        type='text'
      />
    </div>
  );
}

AddressForm.displayName = 'AddressForm';
AddressForm.propTypes = propTypes;
