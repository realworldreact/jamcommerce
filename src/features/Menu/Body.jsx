import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text.jsx';
import Image from './Image.jsx';

const views = {
  [Image.displayName]: Image,
  [Text.displayName]: Text,
};

const propTypes = {
  view: PropTypes.string,
};

export default function Body({ view, ...props }) {
  const View = views[view];
  if (!View) {
    return null;
  }
  return <View { ...props } />;
}

Body.displayName = 'Body';
Body.propTypes = propTypes;
