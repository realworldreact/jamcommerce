import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';
import { navigateTo } from 'gatsby-link';

import styles from './account.module.styl';

import { didMountWithoutAuth, willUnmount } from './redux';
import { isSignedInSelector } from '../Auth/redux';

const cx = classnames.bind(styles);

const propTypes = {
  isSignedIn: PropTypes.bool,
  didMountWithoutAuth: PropTypes.func.isRequired,
  willUnmount: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(isSignedInSelector, isSignedIn => ({
  isSignedIn,
}));
const mapDispatchToProps = { didMountWithoutAuth, willUnmount };

export class Account extends Component {
  componentDidMount() {
    const { didMountWithoutAuth, isSignedIn } = this.props;
    if (!isSignedIn) {
      didMountWithoutAuth();
      navigateTo('/signin');
    }
  }
  componentWillUnmount() {
    this.props.willUnmount();
  }
  render() {
    return (
      <div className={cx('account')}>
        <div className={cx('container')}>
          <nav className={cx('nav')}>
            <ul className={cx('nav-list')}>
              <li className={cx({ underline: false })}>Order History</li>
              <li className={cx({ underline: false })}>Addresses</li>
              <li className={cx({ underline: false })}>Account</li>
            </ul>
          </nav>
          <div className={cx('content')}>HAI</div>
        </div>
      </div>
    );
  }
}

Account.displayName = 'Checkout';
Account.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Account);
