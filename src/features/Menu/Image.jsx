import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Link from 'gatsby-link';

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

export default function Image({ categories, closeMobileMenu }) {
  return (
    <div className={cx('image')}>
      {categories.map(({ title, img, alt, href = '#' }) =>
        <div className={cx('item')} key={title}>
          <Link to={href} onClick={closeMobileMenu}>
            <header>
              <h4>
                {title}
              </h4>
            </header>
            <div>
              <img alt={alt} src={img} />
            </div>
          </Link>
        </div>,
      )}
    </div>
  );
}
Image.displayName = 'Image';
Image.propTypes = propTypes;
