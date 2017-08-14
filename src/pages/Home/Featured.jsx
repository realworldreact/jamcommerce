import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './home.module.styl';

const cx = classnames.bind(styles);
const propTypes = {
  img: PropTypes.string,
  price: PropTypes.number,
  sale: PropTypes.number,
  title: PropTypes.string
};

export default function Featured({ img, title, price, sale }) {
  return (
    <div className={ cx('featured') }>
      <div className={ cx('img') }>
        <img src={ img }/>
      </div>
      <div className={ cx('title') }>
        { title }
      </div>
      <div className={ cx('price') }>
        { price } { sale ? sale : null }
      </div>
    </div>
  );
}
Featured.displayName = 'Featured';
Featured.propTypes = propTypes;
