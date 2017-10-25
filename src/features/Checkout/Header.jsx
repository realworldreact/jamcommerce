import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './checkout.module.styl';

const cx = classnames.bind(styles);
const propTypes = {
  children: PropTypes.string,
};

export default function ViewHeader({ children }) {
  return (
    <header className={ cx('view-header') }>
      <h4>
        { children }
      </h4>
    </header>
  );
}
ViewHeader.displayName = 'ViewHeader';
ViewHeader.propTypes = propTypes;
