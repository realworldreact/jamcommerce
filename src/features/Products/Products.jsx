import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './products.module.styl';

import calloutImg from './callout-img.png';
import Callout from '../Callout';

const cx = classnames.bind(styles);
const propTypes = {
  pathContext: PropTypes.shape({
    callout: PropTypes.object,
    products: PropTypes.array,
  }),
};

export default function Products({ pathContext }) {
  const { callout = {}, products = [] } = pathContext;
  return (
    <div className={ cx('product') }>
      <div className={ cx('header') }>
        <Callout>
          <img
            alt={ `
              a woman's legs dangle as she sits on a ledge wearing fashionable
              and hip heels
            ` }
            src={ calloutImg }
          />
        </Callout>
        <div className={ cx('header-right') }>
          <header className={ cx('title') }>
            <h3>
              { callout.title }
            </h3>
          </header>
          <div className={ cx('copy') }>
            { callout.description }
          </div>
        </div>
      </div>
      <div className={ cx('content') }>
        { products.map(({ name, sale, price, img, alt }, i) => {
          const isSale = !!sale;
          const Price = isSale ? 'del' : 'span';
          const _sale = isSale ?
            (
              <span className={ cx('sale') }>
                ${ sale }
              </span>
            ) :
            null;
          return (
            <a
              className={ cx('product-item') }
              href={ `/women/shoes/${name}` }
              key={ i }
              >
              <div>
                <div className={ cx('img') }>
                  <img
                    alt={ alt }
                    src={ img }
                  />
                </div>
                <header className={ cx('title') }>
                  <h4>
                    { name }
                  </h4>
                </header>
                <div className={ cx('price') }>
                  <Price>${ price }</Price> { _sale }
                </div>
              </div>
            </a>
          );
        }) }
      </div>
    </div>
  );
}

Products.displayName = 'Products';
Products.propTypes = propTypes;
