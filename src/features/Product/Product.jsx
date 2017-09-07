import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './product.module.styl';

const cx = classnames.bind(styles);
const propTypes = {
  data: PropTypes.shape({
    jamProduct: PropTypes.shape({
      description: PropTypes.string,
      details: PropTypes.arrayOf(PropTypes.string),
      images: PropTypes.shape({
        back: PropTypes.object,
        front: PropTypes.object,
        side: PropTypes.object,
      }),
      name: PropTypes.string,
      price: PropTypes.string,
      sale: PropTypes.string,
      thumbnails: PropTypes.shape({
        back: PropTypes.object,
        front: PropTypes.object,
        side: PropTypes.object,
      }),
    }).isRequired,
  }).isRequired,
};

export default function Product({
  data: {
    jamProduct: {
      description,
      details,
      images,
      name,
      price,
      sale,
      thumbnails = {},
    },
  },
}) {
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
    <div className={ cx('product') }>
      <div className={ cx('content') }>
        <div className={ cx('images') }>
          <div>
            <img
              alt='alt is set by content'
              { ...images.front }
            />
          </div>
          <div>
            <div>
              <img
                alt='alt is set by content'
                { ...thumbnails.front }
              />
            </div>
            <div>
              <img
                alt='alt is set by content'
                { ...thumbnails.side }
              />
            </div>
            <div>
              <img
                alt='alt is set by content'
                { ...thumbnails.back }
              />
            </div>
          </div>
        </div>
        <div className={ cx('details') }>
          <div>
            { name }
          </div>
          <div>
            <Price>${ price }</Price> { _sale }
          </div>
          <div>
            { description }
          </div>
          <div>
            { details }
          </div>
          <div>
            Quantity
          </div>
        </div>
      </div>
    </div>
  );
}

Product.displayName = 'Product';
Product.propTypes = propTypes;

export const productFragments = graphql`
  fragment Product_page on JAMProduct {
    name
    price
    sale
    description
    details
    thumbnails {
      front {
        alt
        src
        srcSet
      }
    }
    images {
      front {
        alt
        src
        srcSet
      }

      back {
        alt
        src
        srcSet
      }

      side {
        alt
        src
        srcSet
      }
    }
  }
`;
