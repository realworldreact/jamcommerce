import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Link from 'gatsby-link';

import styles from './home.module.styl';
import FadeIn from './FadeIn';

const cx = classnames.bind(styles);
const propTypes = {
  img: PropTypes.string,
  price: PropTypes.number,
  sale: PropTypes.number,
  title: PropTypes.string,
};

export default function Featured({ img, title, price, sale }) {
  const isSale = !!sale;
  const Price = isSale ? 'del' : 'span';
  const _sale = isSale
    ? <span className={cx('sale')}>
        ${sale}
      </span>
    : null;
  return (
    <Link className={cx('featured')} to="/women/shoes">
      <div className={cx('img-container')}>
        <FadeIn height={180}>
          {onLoad => <img className={cx('img')} src={img} onLoad={onLoad} />}
        </FadeIn>
      </div>
      <header className={cx('title')}>
        <h4>
          {title}
        </h4>
      </header>
      <div className={cx('price')}>
        <Price>${price}</Price> {_sale}
      </div>
    </Link>
  );
}
Featured.displayName = 'Featured';
Featured.propTypes = propTypes;
