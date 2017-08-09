import React from 'react';
import classnames from 'classnames/bind';

import styles from './nav.module.styl';
import cart from './cart.svg';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Nav() {
  return (
    <div>
      <nav className={ cx('navbar', 'top') }>
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
      <nav className={ cx('navbar', 'bottom') }>
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
    </div>
  );
}

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;
