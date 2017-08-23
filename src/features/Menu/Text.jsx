import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

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

export default function Text({ categories }) {
  return (
    <div className={ cx('text') }>
      { categories.map(({ title, sub }) =>
        (
          <div
            className={ cx('category') }
            key={ title }
            >
            <header>
              <h4>
                { title }
              </h4>
            </header>
            <hr />
            <div className={ cx('content') }>
              { sub.map(({ title, href = '#' }) =>
                (
                  <a
                    className={ cx('item') }
                    href={ href }
                    key={ title }
                    >
                    <p>
                      { title }
                    </p>
                  </a>
                ),
              ) }
            </div>
          </div>
        ),
      ) }
    </div>
  );
}
Text.displayName = 'Text';
Text.propTypes = propTypes;
