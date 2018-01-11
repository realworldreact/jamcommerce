import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './address-display.module.styl';
import checkmark from './check-mark.svg';

const cx = classnames.bind(styles);
const propTypes = {
  name: PropTypes.string,
  address1: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  simple: PropTypes.boolean,
  selected: PropTypes.selected,
};

export default function AddressDisplay({
  name,
  address1,
  address2,
  city,
  state,
  zip,
  selected,
  simple,
}) {
  return (
    <div className={cx({ 'address-display': true, selected, simple })}>
      {selected
        ? <img src={checkmark} className={cx('checkmark')} alt="selected" />
        : null}
      <div className={cx('body')}>
        <p>
          <bold>
            {name}
          </bold>
        </p>
        <p>
          <bold>
            {address1}
          </bold>
        </p>
        {address2 &&
          <p>
            {address2}
          </p>}
        <p>
          {city}, {state}, {zip}
        </p>
      </div>
    </div>
  );
}
AddressDisplay.displayName = 'AddressDisplay';
AddressDisplay.propTypes = propTypes;
