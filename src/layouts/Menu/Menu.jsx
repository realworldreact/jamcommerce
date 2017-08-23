import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './menu.module.styl';

const cx = classnames.bind(styles);
const propTypes = {
  children: PropTypes.element,
};

const exampleCopy = `
  Note: This is an example site. All links point to the same route.
`;
export default function Menu({ children }) {
  return (
    <div className={ cx('menu') }>
      { children }
      <div>
        { exampleCopy }
      </div>
    </div>
  );
}
Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
