import React from 'react';
import classnames from 'classnames/bind';

import styles from './nav.styl';
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
        New Arrivals
      </nav>
    </div>
  );
}

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;
