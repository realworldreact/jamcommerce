import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Link from 'gatsby-link';

import styles from './account.module.styl';
import {
  showEditProfile,
  showingEditProfileSelector,
  cancelEdit,
  submitEditProfile,
  showChangePassword,
  showingChangePasswordSelector,
  submitChangePassword,
  fullNameSelector,
  emailSelector,
} from './redux';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import { passwordSelector } from '../Auth/redux';

const cx = classnames.bind(styles);
const propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  showEditProfile: PropTypes.func,
  cancelEditProfile: PropTypes.func,
  showingEditProfile: PropTypes.bool,
  showChangePassword: PropTypes.func,
  showingChangePassword: PropTypes.bool,
};

const mapStateToProps = createSelector(
  fullNameSelector,
  emailSelector,
  showingEditProfileSelector,
  showingChangePasswordSelector,
  passwordSelector,
  (
    fullName,
    email,
    showingEditProfile,
    showingChangePassword,
    currentPassword,
  ) => ({
    fullName,
    email,
    showingEditProfile,
    showingChangePassword,
    currentPassword,
  }),
);
const mapDispatchToProps = {
  showEditProfile,
  cancelEdit,
  submitEditProfile,
  showChangePassword,
  submitChangePassword,
};

export class Profile extends Component {
  clickEditProfile = e => {
    e.preventDefault();
    this.props.showEditProfile();
  };
  clickChangePassword = e => {
    e.preventDefault();
    this.props.showChangePassword();
  };

  render() {
    const {
      fullName,
      email,
      showingEditProfile,
      submitEditProfile,
      cancelEdit,
      showingChangePassword,
      submitChangePassword,
      currentPassword,
    } = this.props;
    return (
      <div className={cx('profile')}>
        <div className={cx('left')}>
          <h1>
            {fullName}
          </h1>
          <h4>
            {email}
          </h4>
          <div className={cx('actions')}>
            <h3>Actions</h3>
            <Link
              to="/account/account/edit-profile"
              onClick={this.clickEditProfile}
            >
              Edit Profile
            </Link>
            <Link
              to="/account/account/change-password"
              onClick={this.clickChangePassword}
            >
              Change Password
            </Link>
          </div>
        </div>
        <div className={cx('right')}>
          {showingEditProfile &&
            <EditProfile
              handleSubmit={submitEditProfile}
              onCancelEdit={cancelEdit}
            />}
          {showingChangePassword &&
            <ChangePassword
              handleSubmit={submitChangePassword}
              onCancelEdit={cancelEdit}
              currentPassword={currentPassword}
            />}
        </div>
      </div>
    );
  }
}
Profile.displayName = 'Profile';
Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
