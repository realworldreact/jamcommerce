import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './menu.module.styl';
import Body from './Body.jsx';

const cx = classnames.bind(styles);
const propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  onMouseLeave: PropTypes.func,
};

const exampleCopy = `
  Note: This is an example site. All links point to the same route.
`;
export default function Menu({ children, isOpen, onMouseLeave }) {
  const menuClasses = {
    menu: true,
    open: isOpen,
  };
  return (
    <div
      className={ cx(menuClasses) }
      onMouseLeave={ onMouseLeave }
      >
      { children }
      <div>
        { exampleCopy }
      </div>
    </div>
  );
}

Menu.Body = Body;

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
