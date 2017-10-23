import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './address-display.module.styl';
import Input from '../Input';

const cx = classnames.bind(styles);
const propTypes = {
  model: PropTypes.string.isRequired,
};

export default function AddressForm({ model }) {
  return (
    <div className={ cx('address-form') }>
      <Input
        label='Name'
        messages={ {
          length: 'Name should be at least 6 characters',
          required: 'Name is required',
        } }
        model={ `${model}.name` }
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
        model={ `${model}.address` }
        type='text'
        validators={ {
          required: (val = '') => val.length,
        } }
      />
      <Input
        label='Apt'
        model={ `${model}.address2` }
        type='text'
      />
      <Input
        label='City'
        model={ `${model}.city` }
        type='text'
      />
      <Input
        label='State'
        model={ `${model}.state` }
        type='text'
      />
      <Input
        label='Zip Code'
        model={ `${model}.zip` }
        type='text'
      />
    </div>
  );
}

AddressForm.displayName = 'AddressForm';
AddressForm.propTypes = propTypes;
