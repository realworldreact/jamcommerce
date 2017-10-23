import React from 'react';
import classnames from 'classnames/bind';

import styles from './checkout.module.styl';
import Shipping from './Shipping.jsx';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Checkout() {
  return (
    <div className={ cx('checkout') }>
      <header className={ cx('header') }>
        <h4>Check Out</h4>
      </header>
      <div className={ cx('container') }>
        <nav className={ cx('nav') }>
          <ul className={ cx('nav-list') }>
            <li className={ cx('underline') }>Address</li>
            <li>Billing</li>
            <li>Confirm</li>
          </ul>
        </nav>
        <div className={ cx('content') }>
          <Shipping />
        </div>
      </div>
    </div>
  );
}
Checkout.displayName = 'Checkout';
Checkout.propTypes = propTypes;
