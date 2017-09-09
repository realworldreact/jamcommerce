import React from 'react';
import Select from 'react-select';

import './selector.styl';

const propTypes = {};

export default function Selector(props) {
  return <Select { ...props } />;
}

Selector.displayName = 'Selector';
Selector.propTypes = propTypes;
