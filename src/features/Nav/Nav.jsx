import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';
import Link from 'gatsby-link';

import {
  categoriesSelector,
  clickOnSubNav,
  clickOnSignIn,
  directoriesSelector,
  directorySelector,
  hoverOnSubNav,
  isMenuOpenSelector,
  mouseLeaveMenu,
  closeSubMenu,
} from './redux';
import styles from './nav.module.styl';
import cart from './cart.svg';
import hamburger from './hamburger.svg';
import menuClose from './menu-close.svg';
import backArrow from './back-arrow.svg';
import Menu from '../Menu';
import { isSignedInSelector, nameSelector } from '../Auth/redux';
import { numInCartSelector } from '../Cart/redux';

const preventDefault = e => e && e.preventDefault();
const createBoundFunc = _.memoize(
  (name, e, ac, dispatch) => _.flow(e, () => ac(name), dispatch),
  (name, e, ac) => name + ac,
);

const cx = classnames.bind(styles);
const mapStateToProps = createSelector(
  isMenuOpenSelector,
  directoriesSelector,
  directorySelector,
  categoriesSelector,
  numInCartSelector,
  isSignedInSelector,
  nameSelector,
  (
    isMenuOpen,
    directories = [],
    currentDirectory,
    categories,
    numInCart,
    isSignedIn,
    name,
  ) => ({
    categories,
    currentDirectory,
    directories,
    isMenuOpen,
    isSignedIn,
    name,
    numInCart,
  }),
);

function mapDispatchToProps(dispatch) {
  const dispatchers = bindActionCreators(
    { clickOnSignIn, mouseLeaveMenu, closeSubMenu },
    dispatch,
  );
  dispatchers.dispatch = dispatch;
  return () => dispatchers;
}

function mergeProps(stateProps, dispatchProps) {
  const { directories = [] } = stateProps;
  const { dispatch } = dispatchProps;
  const clickOnSubNavActions = directories.reduce((dispatchers, { title }) => {
    dispatchers[title] = createBoundFunc(
      title,
      preventDefault,
      clickOnSubNav,
      dispatch,
    );

    return dispatchers;
  }, {});
  const hoverOnSubNavActions = directories.reduce((dispatchers, { title }) => {
    dispatchers[title] = createBoundFunc(
      title,
      _.noop,
      hoverOnSubNav,
      dispatch,
    );
    return dispatchers;
  }, {});

  return {
    ...stateProps,
    ...dispatchProps,
    clickOnSubNavActions,
    hoverOnSubNavActions,
  };
}

const propTypes = {
  categories: PropTypes.array,
  clickOnSignIn: PropTypes.func.isRequired,
  clickOnSubNavActions: PropTypes.object,
  currentDirectory: PropTypes.object,
  directories: PropTypes.array,
  hoverOnSubNavActions: PropTypes.object,
  isMenuOpen: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  mouseLeaveMenu: PropTypes.func.isRequired,
  closeSubMenu: PropTypes.func.isRequired,
  name: PropTypes.string,
  numInCart: PropTypes.number,
};

export function Nav({
  categories,
  clickOnSignIn,
  clickOnSubNavActions,
  currentDirectory,
  directories,
  hoverOnSubNavActions,
  isMenuOpen,
  isSignedIn,
  mouseLeaveMenu,
  closeSubMenu,
  name,
  numInCart,
}) {
  let signBtn;
  if (isSignedIn) {
    signBtn = (
      <Link to="/account" className={cx('signin-link')}>
        {name}
      </Link>
    );
  } else {
    signBtn = (
      <Link onClick={clickOnSignIn} to="/signin" className={cx('signin-link')}>
        Sign In
      </Link>
    );
  }
  return (
    <div className={cx('navbar')}>
      <nav className={cx('top')}>
        <div className={cx('hamburger')}>
          <img alt="menu hamburger" src={hamburger} />
        </div>
        <Link to="/">
          <div className={cx('title')}>JAM Commerce</div>
        </Link>
        <ul className={cx('account')}>
          <li>
            {signBtn}
          </li>
          <li>
            <Link
              className={cx('cart')}
              to="/cart"
              style={{ backgroundImage: `url(${cart})` }}
            >
              <span className={cx('num-in-cart')}>
                {typeof numInCart === 'number' ? numInCart : 0}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className={cx('bottom')}>
        <div className={cx('mobile-menu-meta')}>
          <div>
            {isMenuOpen &&
              <button className={cx('back-button')} onClick={closeSubMenu}>
                <img src={backArrow} /> Back
              </button>}
          </div>
          <img alt="menu close" src={menuClose} />
        </div>
        <ul>
          {directories.map(({ title, href }) =>
            <a
              className={cx('item-link')}
              href={href}
              key={title}
              onClick={clickOnSubNavActions[title]}
              onMouseEnter={hoverOnSubNavActions[title]}
            >
              <li className={cx('item')}>
                {title}
              </li>
            </a>,
          )}
          <a className={cx('item-link')} href="/women">
            <li className={cx('item')}>Sale</li>
          </a>
        </ul>
        <div className={cx('mobile-menu-account')}>
          {signBtn}
          <Link to="/cart">View cart</Link>
        </div>
      </nav>
      <Menu isOpen={isMenuOpen} onMouseLeave={mouseLeaveMenu}>
        <Menu.Body categories={categories} view={currentDirectory.view} />
      </Menu>
    </div>
  );
}

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Nav);
