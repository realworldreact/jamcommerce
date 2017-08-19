import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './callout.module.styl';

const cx = classnames.bind(styles);
const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default function Callout({ className, children }) {
  return (
    <div className={ cx('callout', className) }>
      { children }
    </div>
  );
}
Callout.displayName = 'Callout';
Callout.propTypes = propTypes;
