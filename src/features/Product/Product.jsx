import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import classnames from 'classnames/bind';
import Link from 'gatsby-link';
import Selector from 'react-select';

import leftArrow from './left-arrow.svg';
import styles from './product.module.styl';
import './react-select.styl';
import './product.styl';
import {
  quantityChanged,
  quantitiesSelector,
  currentQuantitySelector,
} from './redux';

const cx = classnames.bind(styles);
const mapStateToProps = createSelector(
  quantitiesSelector,
  currentQuantitySelector,
  (quantities, currentQuantity) => ({
    quantities,
    currentQuantity,
  }),
);

const mapDispatchToProps = {
  quantityChanged: x => quantityChanged((x && x.value) || undefined),
};

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

const propTypes = {
  currentQuantity: PropTypes.number,
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
  quantities: PropTypes.array,
  quantityChanged: PropTypes.func.isRequired,
};

export function Product({
  currentQuantity,
  quantities,
  quantityChanged,
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
              className={ cx('main') }
              { ...images.front }
            />
          </div>
          <div className={ cx('thumbnails') }>
            { _.map(thumbnails, ({ alt, ...rest }, side) =>
              (
                <div key={ side }>
                  <img
                    alt={ alt }
                    { ...rest }
                  />
                </div>
              ),
            ) }
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
          <ul className={ cx('list') }>
            { details.map(detail => (
              <li key={ detail }><small>{ detail }</small></li>
            ))}
          </ul>
          <div className={ cx('quantity') }>
            <div className={ cx('copy') }>
              Quantity{ ' ' }
            </div>
            <Selector
              className={ cx('quantity-selector', 'selector') }
              onChange={ quantityChanged }
              options={ quantities }
              value={ currentQuantity }
            />
            <div>
              <button className={ cx('button') }>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
      <Link to='/women/shoes'>
        <div className={ cx('back') }>
          <img
            alt='A smal left pointing arrow'
            className={ cx('left-arrow') }
            src={ leftArrow }
          />
          Back to Shoes
        </div>
      </Link>
    </div>
  );
}

Product.displayName = 'Product';
Product.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Product);
