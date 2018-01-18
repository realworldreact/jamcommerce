import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Link from 'gatsby-link';

import styles from './account.module.styl';
import { fullNameSelector, emailSelector } from '../Auth/redux';
import {
  showEditProfile,
  showingEditProfileSelector,
  showChangePassword,
  showingChangePasswordSelector,
} from './redux';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const cx = classnames.bind(styles);
const propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  showEditProfile: PropTypes.func,
  showingEditProfile: PropTypes.bool,
  showChangePassword: PropTypes.func,
  showingChangePassword: PropTypes.bool,
};

const mapStateToProps = createSelector(
  fullNameSelector,
  emailSelector,
  showingEditProfileSelector,
  showingChangePasswordSelector,
  (fullName, email, showingEditProfile, showingChangePassword) => ({
    fullName,
    email,
    showingEditProfile,
    showingChangePassword,
  }),
);
const mapDispatchToProps = {
  showEditProfile,
  showChangePassword,
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
      showingChangePassword,
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
          {showingEditProfile && <EditProfile />}
          {showingChangePassword && <ChangePassword />}
        </div>
      </div>
    );
  }
}
Profile.displayName = 'Profile';
Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
