import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

import './selector.styl';

const propTypes = {
  maxQuantity: PropTypes.number,
};

const createOptions = _.memoize(n =>
  _.range(n + 1).map(n => ({ value: n, label: String(n) })),
);

export default function Selector({ maxQuantity, ...props }) {
  return (
    <Select
      options={createOptions(maxQuantity || 4)}
      {...props}
      filterOptions={false}
    />
  );
}

Selector.displayName = 'Selector';
Selector.propTypes = propTypes;
