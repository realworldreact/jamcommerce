import React from 'react';
// import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './account.module.styl';
import Input from '../Input';

const cx = classnames.bind(styles);
const propTypes = {};

export default function ProfileForm({ currentPassword }) {
  return (
    <div className={cx('profile-form')}>
      <Input
        label="Current Password"
        messages={{
          required: 'Current Password is required',
          valid: 'Password is invalid',
        }}
        model=".currentpass"
        type="password"
        validators={{
          required: (val = '') => val.length,
          valid: (val = '') => val === currentPassword,
        }}
      />
      <Input
        label="New Password"
        messages={{
          required: 'Current Password is required',
          length: 'Password must be at least 6 characters',
        }}
        model=".newpass"
        type="password"
        validators={{
          required: (val = '') => val.length,
          length: (val = '') => val.length >= 6,
        }}
      />
      <Input
        label="Confirm New Password"
        messages={{
          required: 'Password confirmation is required',
        }}
        model=".confirmpass"
        type="password"
        validators={{
          required: (val = '') => val.length,
        }}
      />
    </div>
  );
}

ProfileForm.displayName = 'AddressForm';
ProfileForm.propTypes = propTypes;
