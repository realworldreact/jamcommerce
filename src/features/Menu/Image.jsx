import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './menu.module.styl';

const cx = classnames.bind(styles);
const propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      img: PropTypes.string,
    }),
  ).isRequired,
};

export default function Image({ categories }) {
  return (
    <div className={ cx('image') }>
      { categories.map(({ title, img, alt, href = '#' }) =>
        (
          <div
            className={ cx('item') }
            key={ title }
            >
            <a href={ href }>
              <header>
                <h4>
                  { title }
                </h4>
              </header>
              <div>
                <img
                  alt={ alt }
                  src={ img }
                />
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
