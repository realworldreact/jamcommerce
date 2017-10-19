import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';
import Link from 'gatsby-link';

import styles from './cart.module.styl';

import { totalSelector, itemsSelector, clickOnRemove } from './redux';
import Selector from '../Selector';

const cx = classnames.bind(styles);

const mapStateToProps = createSelector(
  itemsSelector,
  totalSelector,
  (items, total) => ({
    total,
    items: items.map(({ meta = {}, ...item }) => Object.assign(item, meta)),
  }),
);
const mapDispatchToProps = { clickOnRemove };

const propTypes = {
  clickOnRemove: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      quantity: PropTypes.number,
      size: PropTypes.number,
      sku: PropTypes.string,
      src: PropTypes.string,
      srcSet: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  total: PropTypes.shape({
    amount: PropTypes.string,
  }),
};

export function Cart({ clickOnRemove, items = [], total = {} }) {
  return (
    <div className={ cx('cart') }>
      <header className={ cx('header') }>
        <h2>Your Cart</h2>
        <div className={ cx('header-underline') } />
      </header>
      <div className={ cx('table') }>
        <div className={ cx('table-cell-first', 'table-first') }>Item</div>
        <div className={ cx('table-cell') }>Price</div>
        <div className={ cx('table-cell') }>Quantity</div>
        <div className={ cx('table-cell') }>Total</div>
        { items.reduce(
          (a, { title, sku, image = {}, price, size, quantity }) => {
            a.push(
              <div
                className={ cx('table-cell-first', 'details') }
                key={ sku + sku }
                >
                <div>
                  <Link to={ `/women/shoes/${sku}` }>
                    <img
                      alt={ image.alt }
                      className={ cx('details-img') }
                      src={ image.src }
                      srcSet={ image.srcSet }
                    />
                  </Link>
                </div>
                <div className={ cx('details-info') }>
                  <Link to={ `/women/shoes/${sku}` }>
                    <div className={ cx('product-name') }>
                      { title }
                    </div>
                  </Link>
                  <div className={ cx('size-info') }>
                    Size: <span className={ cx('size-selected') }>{ size }</span>
                  </div>
                  <div>
                    <button
                      className={ cx('remove') }
                      onClick={ () => clickOnRemove(sku) }
                      >
                      Remove
                    </button>
                  </div>
                </div>
              </div>,
            );
            a.push(
              <div
                className={ cx('table-cell', 'price') }
                key={ sku + 'price' }
                >
                ${ price.amount }
              </div>,
            );
            a.push(
              <div
                className={ cx('table-cell', 'quantity') }
                key={ sku + 'quantity' }
                >
                <Selector
                  className={ cx('quantity-selector', 'selector') }
                  value={ quantity }
                />
              </div>,
            );
            a.push(
              <div
                className={ cx('table-cell', 'total') }
                key={ sku + 'total' }
                >
                ${ _.round(price.amount * quantity, 2) }
              </div>,
            );
            return a;
          },
          [],
        ) }
        <div className={ cx('table-cell', 'table-total') }>GRAND TOTAL</div>
        <div className={ cx('table-cell', 'table-sum') }>
          ${ total.amount }
        </div>
      </div>
      <div className={ cx('checkout') }>
        <Link to='/checkout'>
          <button className={ cx('button') }>Check Out</button>
        </Link>
      </div>
    </div>
  );
}
Cart.displayName = 'Cart';
Cart.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
