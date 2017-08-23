import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import styles from './nav.module.styl';
import cart from './cart.svg';
import { clickOnSubNav } from './redux';
import hamburger from './hamburger.svg';
import Menu, { Image, Text } from '../Menu';

const cx = classnames.bind(styles);
const mapStateToProps = null;
const mapDispatchToProps = {
  clickOnSubNav: e => {
    e.preventDefault();
    return clickOnSubNav();
  },
};
const propTypes = {
  clickOnSubNav: PropTypes.func.isRequired,
};
const isImg = true;

export function Nav({ clickOnSubNav }) {
  const MenuComp = isImg ? Image : Text;
  return (
    <div className={ cx('navbar') }>
      <nav className={ cx('top') }>
        <div className={ cx('hamburger') }>
          <img src={ hamburger } />
        </div>
        <div className={ cx('title') }>JAM Commerce</div>
        <ul className={ cx('account') }>
          <li>
            <a>Sign In</a>
          </li>
          <li>
            <a className={ cx('cart') }>
              <img src={ cart } />
            </a>
          </li>
        </ul>
      </nav>
      <nav className={ cx('bottom') }>
        <ul>
          <li>
            <a onClick={ clickOnSubNav }>New Arrivals</a>
          </li>
          <li>
            <a>Womens</a>
          </li>
          <li>
            <a>Mens</a>
          </li>
          <li>
            <a>Collections</a>
          </li>
          <li>
            <a>Sales</a>
          </li>
        </ul>
      </nav>
      <Menu>
        <MenuComp />
      </Menu>
    </div>
  );
}

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
