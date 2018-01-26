import React from 'react';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './closebutton.module.styl';
import icon from './close-button.svg';

const cx = classnames.bind(styles);

const CloseButton = ({ onClick }) =>
  <button className={cx('close-button')} onClick={onClick}>
    <img alt="X" src={icon} />
  </button>;

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
