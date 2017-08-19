import React from 'react';
import classnames from 'classnames/bind';

import styles from './nav.module.styl';
import cart from './cart.svg';
import Menu from '../Menu';
import { Split } from '../Menu';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Nav() {
  const MenuComp = Split;
  return (
    <div className={ cx('navbar') }>
      <nav className={ cx('top') }>
        <div className={ cx('title') }>
          JAM Commerce
        </div>
        <ul>
          <li>
            <a>
              Sign In
            </a>
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
            <a>New Arrivals</a>
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
      <Menu><MenuComp /></Menu>
    </div>
  );
}

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;
