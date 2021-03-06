import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';
import Link from 'gatsby-link';

import styles from './cart.module.styl';
import {
  totalSelector,
  itemsSelector,
  clickOnRemove,
  changeQuantity,
} from './redux';
import Selector from '../Selector';

const cx = classnames.bind(styles);
const propTypes = {
  clickOnRemove: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func,
  editable: PropTypes.bool,
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

const mapStateToProps = createSelector(
  itemsSelector,
  totalSelector,
  (items, total) => ({
    total,
    items: items.map(({ meta = {}, ...item }) => Object.assign(item, meta)),
  }),
);

const mapDispatchToProps = { clickOnRemove, changeQuantity };

export function Table({
  clickOnRemove,
  changeQuantity,
  items = [],
  total = {},
  editable = true,
}) {
  return (
    <div className={cx('table')}>
      <div className={cx('table-cell-first', 'table-first')}>Item</div>
      <div className={cx('table-cell')}>Price</div>
      <div className={cx('table-cell')}>Quantity</div>
      <div className={cx('table-cell')}>Total</div>
      {items.reduce((a, { title, sku, image = {}, price, size, quantity }) => {
        a.push(
          <div className={cx('table-cell-first', 'details')} key={sku + sku}>
            <div>
              <Link to={`/women/shoes/${sku}`}>
                <img
                  alt={image.alt}
                  className={cx('details-img')}
                  src={image.src}
                  srcSet={image.srcSet}
                />
              </Link>
            </div>
            <div className={cx('details-info')}>
              <Link to={`/women/shoes/${sku}`}>
                <div className={cx('product-name')}>
                  {title}
                </div>
              </Link>
              <div className={cx('size-info')}>
                Size: <span className={cx('size-selected')}>{size}</span>
              </div>
              <div>
                {editable
                  ? <button
                      className={cx('remove')}
                      onClick={() => clickOnRemove(sku)}
                    >
                      Remove
                    </button>
                  : null}
              </div>
            </div>
          </div>,
        );
        a.push(
          <div className={cx('table-cell', 'price')} key={sku + 'price'}>
            ${price.amount}
          </div>,
        );
        a.push(
          editable
            ? <div
                className={cx('table-cell', 'quantity')}
                key={sku + 'quantity'}
              >
                <Selector
                  className={cx('quantity-selector', 'selector')}
                  value={quantity}
                  onChange={({ value }) => changeQuantity({ sku, value })}
                />
              </div>
            : <div
                className={cx('table-cell', 'quantity-static')}
                key={sku + 'quantityt'}
              >
                {quantity}
              </div>,
        );
        a.push(
          <div className={cx('table-cell', 'total')} key={sku + 'total'}>
            ${_.round(price.amount * quantity, 2)}
          </div>,
        );
        return a;
      }, [])}
      <div className={cx('table-cell', 'table-total')}>TOTAL</div>
      <div className={cx('table-cell', 'table-sum')}>
        ${total.amount}
      </div>
    </div>
  );
}
Table.displayName = 'Table';
Table.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
