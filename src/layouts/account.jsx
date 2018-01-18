import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Link, { navigateTo } from 'gatsby-link';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import styles from './account.module.styl';
import MainWrapper from './index';

import { didMountWithoutAuth, willUnmount } from '../features/Account/redux';
import { isSignedInSelector } from '../features/Auth/redux';

const propTypes = {
  showOrderHistory: PropTypes.bool,
  showAddresses: PropTypes.bool,
  showProfile: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  didMountWithoutAuth: PropTypes.func.isRequired,
  willUnmount: PropTypes.func.isRequired,
  children: PropTypes.func,
};

const mapStateToProps = createSelector(isSignedInSelector, isSignedIn => ({
  isSignedIn,
}));
const mapDispatchToProps = { didMountWithoutAuth, willUnmount };

const cx = classnames.bind(styles);

export class TemplateWrapper extends PureComponent {
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
    const { children } = this.props;
    return (
      <MainWrapper>
        {() =>
          <div className={cx('account')}>
            <div className={cx('container')}>
              <nav className={cx('nav')}>
                <ul className={cx('nav-list')}>
                  <li>
                    <Link
                      to="/account/orders"
                      activeStyle={{ textDecoration: 'underline' }}
                    >
                      Order History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/addresses"
                      activeStyle={{ textDecoration: 'underline' }}
                    >
                      Addresses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/account"
                      activeStyle={{ textDecoration: 'underline' }}
                    >
                      Account
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className={cx('content')}>
                {children && children()}
              </div>
            </div>
          </div>}
      </MainWrapper>
    );
  }
}

TemplateWrapper.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(TemplateWrapper);
