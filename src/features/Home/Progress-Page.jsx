import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedView } from 'react-view-pager';

const propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
};

const colors = ['#209D22', '#106CCC', '#C1146B', '#11BDBF', '#8A19EA'];

export default function ProgressPage({ className, index, onClick }) {
  return (
    <AnimatedView
      animations={[
        {
          prop: 'scale',
          stops: [[-300, 0.75], [0, 1], [300, 0.75]],
        },
        {
          prop: 'opacity',
          stops: [[-300, 0.5], [0, 1], [300, 0.5]],
        },
        {
          prop: 'backgroundColor',
          stops: [[-300, '#cccccc'], [0, colors[index]], [300, '#cccccc']],
        },
      ]}
      className={className}
      index={index}
      key={index}
      onClick={onClick}
    />
  );
}
ProgressPage.displayName = 'ProgressPage';
ProgressPage.propTypes = propTypes;
