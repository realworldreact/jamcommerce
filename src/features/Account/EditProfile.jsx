import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';

import styles from './account.module.styl';
import ProfileForm from './ProfileForm';

const cx = classnames.bind(styles);

const EditProfile = ({ onCancelEdit, handleSubmit }) =>
  <div>
    <h3>Edit Profile</h3>
    <Form model="forms.profile" onSubmit={handleSubmit}>
      <ProfileForm />
      <button className={cx('submit')} type="submit">
        Confirm Changes
      </button>
      <br />
      <button className={cx('cancel')} onClick={onCancelEdit}>
        Cancel
      </button>
    </Form>
  </div>;
EditProfile.propTypes = {
  handleSubmit: PropTypes.func,
  onCancelEdit: PropTypes.func,
};

export default EditProfile;
