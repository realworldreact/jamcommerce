import React from 'react';
// import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './account.module.styl';
import Input from '../Input';

const cx = classnames.bind(styles);
const propTypes = {};

export default function ProfileForm() {
  return (
    <div className={cx('profile-form')}>
      <Input label="First Name" model=".firstname" type="text" />
      <Input label="Last Name" model=".lastname" type="text" />
      <Input
        label="Email"
        messages={{
          required: 'Email is required',
          valid: 'Email is invalid',
        }}
        model=".email"
        type="text"
        validators={{
          required: (val = '') => val.length,
          valid: (val = '') => val.includes('@'),
        }}
      />
    </div>
  );
}

ProfileForm.displayName = 'AddressForm';
ProfileForm.propTypes = propTypes;
