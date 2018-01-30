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
      items: PropTypes.arrayOf({
        title: PropTypes.string,
        href: PropTypes.string,
      }),
    }),
  ),
};

export default function Text({ categories, closeMobileMenu }) {
  return (
    <div className={cx('text')}>
      {categories.map(({ title, sub }) =>
        <div className={cx('category')} key={title}>
          <header>
            <h4>
              {title}
            </h4>
          </header>
          <hr />
          <div className={cx('content')}>
            {sub.map(({ title, href = '#' }) =>
              <Link
                className={cx('item')}
                key={title}
                to={href}
                onClick={closeMobileMenu}
              >
                <p>
                  {title}
                </p>
              </Link>,
            )}
          </div>
        </div>,
      )}
    </div>
  );
}
Text.displayName = 'Text';
Text.propTypes = propTypes;
