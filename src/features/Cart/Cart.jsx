import React from 'react';
import classnames from 'classnames/bind';
import Link from 'gatsby-link';

import styles from './cart.module.styl';
import Table from './Table.jsx';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Cart() {
  return (
    <div className={ cx('cart') }>
      <header className={ cx('header') }>
        <h2>Your Cart</h2>
        <div className={ cx('header-underline') } />
      </header>
      <Table />
      <div className={ cx('checkout') }>
        <Link to='/checkout'>
          <button className={ cx('button') }>Check Out</button>
        </Link>
      </div>
    </div>
  );
}
Cart.displayName = 'Cart';
Cart.propTypes = propTypes;
