import React from 'react';
import classnames from 'classnames/bind';

import styles from './menu.module.styl';
import imageMenu from './image-menu.png';

const cx = classnames.bind(styles);
const propTypes = {};

const data = [
  {
    title: 'Women',
    img: imageMenu
  }, {
    title: 'Men',
    img: imageMenu
  }
];
export default function Split() {
  return (
    <div className={ cx('split') }>
      {
        data.map(({ title, img }) => (
          <div className={ cx('item') }>
            <header>{ title }</header>
            <div><img src={ img }/></div>
          </div>
        ))
      }
    </div>
  );
}
Split.displayName = 'Split';
Split.propTypes = propTypes;
