import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './address-display.module.styl';

const cx = classnames.bind(styles);
const propTypes = {
  name: PropTypes.string,
  address1: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
};

export default function AddressDisplay({
  name,
  address1,
  address2,
  city,
  state,
  zip,
}) {
  return (
    <div className={ cx('address-display') }>
      <p>
        <bold>
          { name }
        </bold>
      </p>
      <p>
        <bold>
          { address1 }
        </bold>
      </p>
      { address2 &&
        <p>
          { address2 }
        </p> }
      <p>
        { city }, { state }, { zip }
      </p>
    </div>
  );
}
AddressDisplay.displayName = 'AddressDisplay';
AddressDisplay.propTypes = propTypes;
