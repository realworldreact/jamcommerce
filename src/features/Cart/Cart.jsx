import _ from 'lodash';
import React from 'react';
import classnames from 'classnames/bind';

import styles from './cart.module.styl';

const cx = classnames.bind(styles);
const propTypes = {};

const items = [
  {
    name: 'React',
    alt: 'foo',
    src: '/images/angular-front-xs',
    srcSet:
      '/images/angular-front-xs.png 147w, /images/angular-front-xl.png 1669w, /images/angular-front-lg.png 982w, /images/angular-front-md.png 442w, /images/angular-front-sm.png 295w',
    price: 199,
    size: 7,
    quantity: 3,
  },
  {
    name: 'Webpack',
    alt: 'foo',
    src: '/images/angular-front-xs',
    srcSet:
      '/images/angular-front-xs.png 147w, /images/angular-front-xl.png 1669w, /images/angular-front-lg.png 982w, /images/angular-front-md.png 442w, /images/angular-front-sm.png 295w',
    price: 99,
    size: 7,
    quantity: 4,
  },
  {
    name: 'Angular',
    alt: 'foo',
    src: '/images/react-front-xs',
    srcSet:
      '/images/angular-front-xs.png 147w, /images/angular-front-xl.png 1669w, /images/angular-front-lg.png 982w, /images/angular-front-md.png 442w, /images/angular-front-sm.png 295w',
    price: 250,
    size: 7,
    quantity: 2,
  },
];
export default function Cart() {
  return (
    <div className={ cx('cart') }>
      <header className={ cx('header') }>
        <h2>Your Cart</h2>
      </header>
      <div className={ cx('table') }>
        <div className={ cx('table-cell-first', 'table-first') }>Item</div>
        <div className={ cx('table-cell') }>Price</div>
        <div className={ cx('table-cell') }>Quantity</div>
        <div className={ cx('table-cell') }>Total</div>
        { items.reduce(
          (a, { name, src, srcSet, alt, price, size, quantity }) => {
            a.push(
              <div
                className={ cx('table-cell-first', 'details') }
                key={ name + name }
                >
                <div>
                  <img
                    alt={ alt }
                    className={ cx('details-img') }
                    src={ src }
                    srcSet={ srcSet }
                  />
                </div>
                <div className={ cx('details-info') }>
                  <div>{ name }</div>
                  <div>size: { size }</div>
                  <div><button className={ cx('remove') }>remove</button></div>
                </div>
              </div>,
            );
            a.push(
              <div
                className={ cx('table-cell', 'price') }
                key={ name + 'price' }
                >
                { price }
              </div>,
            );
            a.push(
              <div
                className={ cx('table-cell', 'quantity') }
                key={ name + 'quantity' }
                >
                { price }
              </div>,
            );
            a.push(
              <div
                className={ cx('table-cell', 'total') }
                key={ name + 'total' }
                >
                { _.round(price * quantity, 2) }
              </div>,
            );
            return a;
          },
          [],
        ) }
        <div className={ cx('table-cell', 'table-total') }>Total</div>
        <div className={ cx('table-cell', 'table-sum') }>
          ${ '199' }
        </div>
      </div>
    </div>
  );
}
Cart.displayName = 'Cart';
Cart.propTypes = propTypes;
