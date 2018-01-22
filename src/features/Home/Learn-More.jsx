import React from 'react';
import classnames from 'classnames/bind';

import styles from './home.module.styl';
import rightTriangle from './right-triangle.svg';

const cx = classnames.bind(styles);
const propTypes = {};

export default function LearnMore() {
  return (
    <a className={cx('learn-more')} href="/women/shoes">
      Learn More
      <img className={cx('triangle')} src={rightTriangle} />
    </a>
  );
}
LearnMore.displayName = 'LearnMore';
LearnMore.propTypes = propTypes;
