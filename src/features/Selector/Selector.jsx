import React from 'react';
import Select from 'react-select';

import './selector.styl';

const propTypes = {};

const options = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

export default function Selector(props) {
  return (
    <Select
      options={ options }
      { ...props }
    />
  );
}

Selector.displayName = 'Selector';
Selector.propTypes = propTypes;
