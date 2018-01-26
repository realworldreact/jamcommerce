import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';
import Link from 'gatsby-link';
import Modal from 'react-modal';

import styles from './products.module.styl';
import Product from '../Product';

import {
  clickOnClosePreview,
  clickOnProductPreview,
  showProductModalSelector,
} from './redux';
import calloutImg from './callout-img.png';
import Callout from '../Callout';

const cx = classnames.bind(styles);
const propTypes = {
  clickOnProductPreview: PropTypes.func.isRequired,
  clickOnClosePreview: PropTypes.func.isRequired,
  currentProduct: PropTypes.string,
  data: PropTypes.shape({
    productYaml: PropTypes.shape({
      callout: PropTypes.object,
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const mapStateToProps = createSelector(
  showProductModalSelector,
  currentProduct => ({
    currentProduct,
  }),
);
const mapDispatchToProps = {
  clickOnProductPreview: (e, name) => {
    e.preventDefault();
    return clickOnProductPreview(name);
  },
  clickOnClosePreview,
};

const modalStyles = {
  content: {
    padding: 'none',
  },
};
export class Products extends PureComponent {
  componentDidMount() {
    Modal.setAppElement('#___gatsby');
  }
  render() {
    const {
      clickOnClosePreview,
      clickOnProductPreview,
      currentProduct,
      data: {
        jamCopy: { callout: { description, title } = {} } = {},
        allJamProduct: { edges = [] } = {},
      } = {},
    } = this.props;
    const products = edges.map(({ node }) => node);
    return (
      <div className={cx('product')}>
        <div className={cx('header')}>
          <Callout>
            <img
              alt={`
              a woman's legs dangle as she sits on a ledge wearing fashionable
              and hip heels
              `}
              src={calloutImg}
            />
          </Callout>
          <div className={cx('header-right')}>
            <header className={cx('title')}>
              <h1>
                {title}
              </h1>
            </header>
            <div className={cx('copy')}>
              {description}
            </div>
          </div>
        </div>
        <div className={cx('content')}>
          {products.map((jamProduct, i) => {
            const { name, sale, prices, slug, images: { front } } = jamProduct;

            const isSale = !!sale;
            const Price = isSale ? 'del' : 'span';
            const _sale = isSale
              ? <span className={cx('sale')}>
                  ${sale}
                </span>
              : null;
            return (
              <Link
                className={cx('product-item')}
                key={i}
                to={`/women/shoes/${slug}`}
              >
                <div>
                  <div className={cx('img')}>
                    <img alt="alt provided by content below" {...front} />
                  </div>
                  <header className={cx('title')}>
                    <h4>
                      {name}
                    </h4>
                  </header>
                  <div className={cx('price')}>
                    <Price>${prices[0].amount}</Price> {_sale}
                  </div>
                </div>
                <div className={cx('preview-button-container')}>
                  <button
                    className={cx('preview-button')}
                    onClick={e => clickOnProductPreview(e, name)}
                  >
                    Quick Shop
                  </button>
                </div>
                <Modal isOpen={currentProduct === name} style={modalStyles}>
                  <div className={cx('preview-container')}>
                    <div className={cx('preview-content')}>
                      <Product
                        data={{
                          jamProduct,
                        }}
                        showBackToShoes={false}
                      />
                    </div>
                    <button className={cx('preview-close-button')}>X</button>
                  </div>
                </Modal>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Products);

export const pageQuery = graphql`
  fragment Products_copy on JAMCopy {
    callout {
      title
      description
    }
  }

  fragment Products_products on JAMProduct {
    ...Product_page
  }
`;
