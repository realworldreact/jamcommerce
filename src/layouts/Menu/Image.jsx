import React from 'react';
import classnames from 'classnames/bind';

import styles from './menu.module.styl';
import imageMenu from './image-menu.png';

const cx = classnames.bind(styles);
const propTypes = {};

const data = [
  {
    title: 'Women',
    img: imageMenu,
  },
  {
    title: 'Men',
    img: imageMenu,
  },
];
export default function Image() {
  return (
    <div className={ cx('image') }>
      { data.map(({ title, img, href = '#' }) =>
        (
          <div
            className={ cx('item') }
            key={ title }
            >
            <a src={ href }>
              <header>
                <h4>
                  { title }
                </h4>
              </header>
              <div>
                <img src={ img } />
              </div>
            </a>
          </div>
        ),
      ) }
    </div>
  );
}
Image.displayName = 'Image';
Image.propTypes = propTypes;
