import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';

import styles from './account.module.styl';
import ChangePasswordForm from './ChangePasswordForm';

const cx = classnames.bind(styles);

const passwordsMatch = ({ newpass, confirmpass }) => {
  console.log('HAI', newpass, confirmpass, newpass === confirmpass);
  return newpass === confirmpass;
};

const ChangePassword = ({ onCancelEdit, handleSubmit, currentPassword }) =>
  <div>
    <h3>Change Password</h3>
    <Form
      model="forms.changepassword"
      onSubmit={handleSubmit}
      validators={{
        '': { passwordsMatch },
      }}
    >
      <ChangePasswordForm currentPassword={currentPassword} />
      <button className={cx('submit')} type="submit">
        Confirm Changes
      </button>
      <br />
      <button className={cx('cancel')} onClick={onCancelEdit}>
        Cancel
      </button>
    </Form>
  </div>;
ChangePassword.propTypes = {
  handleSubmit: PropTypes.func,
  onCancelEdit: PropTypes.func,
  currentPassword: PropTypes.string,
};

export default ChangePassword;
