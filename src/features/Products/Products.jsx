import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Link from 'gatsby-link';

import styles from './products.module.styl';

import calloutImg from './callout-img.png';
import Callout from '../Callout';

const cx = classnames.bind(styles);
const propTypes = {
  data: PropTypes.shape({
    productYaml: PropTypes.shape({
      callout: PropTypes.object,
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function Products({
  data: {
    jamCopy: { callout: { description, title } = {} } = {},
    allJamProduct: { edges = [] } = {},
  } = {},
}) {
  const products = edges.map(({ node }) => node);
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
              { title }
            </h3>
          </header>
          <div className={ cx('copy') }>
            { description }
          </div>
        </div>
      </div>
      <div className={ cx('content') }>
        { products.map(
          ({ name, sale, prices, slug, thumbnails: { front } }, i) => {
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
              <Link
                className={ cx('product-item') }
                key={ i }
                to={ `/women/shoes/${slug}` }
                >
                <div>
                  <div className={ cx('img') }>
                    <img
                      alt='alt provided by content below'
                      { ...front }
                    />
                  </div>
                  <header className={ cx('title') }>
                    <h4>
                      { name }
                    </h4>
                  </header>
                  <div className={ cx('price') }>
                    <Price>${ prices[0].amount }</Price> { _sale }
                  </div>
                </div>
              </Link>
            );
          },
        ) }
      </div>
    </div>
  );
}

Products.displayName = 'Products';
Products.propTypes = propTypes;

export const pageQuery = graphql`
  fragment Products_copy on JAMCopy {
    callout {
      title
      description
    }
  }

  fragment Products_products on JAMProduct {
    name
    prices {
      amount
    }
    sale
    slug
    thumbnails {
      front {
        alt
        src
        srcSet
      }
    }
  }
`;
