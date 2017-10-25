import React from 'react';
import classnames from 'classnames/bind';

import styles from './checkout.module.styl';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Confirm() {
  return <div className={ cx('confirm') }>confirm</div>;
}
Confirm.displayName = 'Confirm';
Confirm.propTypes = propTypes;
