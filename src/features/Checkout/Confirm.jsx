import React from 'react';
import classnames from 'classnames/bind';

import styles from './checkout.module.styl';
import { Table } from '../Cart';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Confirm() {
  return (
    <div className={ cx('confirm') }>
      <header>
        <h5>Please Review your cart order</h5>
      </header>
      <Table />
      <footer className={ cx('footer') }>
        <button className={ cx('next-button') }>
          Confirm Purchase
        </button>
      </footer>
    </div>
  );
}
Confirm.displayName = 'Confirm';
Confirm.propTypes = propTypes;
