import React from 'react';
import classnames from 'classnames/bind';

import styles from './menu.module.styl';

const cx = classnames.bind(styles);
const propTypes = {};

const data = [
  {
    title: 'Clothing',
    items: [{
      title: 'Active Wear'
    }, {
      title: 'Beach & Sun'
    }, {
      title: 'Blazers'
    }, {
      title: 'Coats & Blazers'
    }, {
      title: 'Demin'
    }, {
      title: 'Dresses'
    }, {
      title: 'Pajamas'
    }, {
      title: 'Pants & Leggings'
    }, {
      title: 'Shirts'
    }, {
      title: 'Skirts'
    }, {
      title: 'Sleep & Lounge'
    }, {
      title: 'Tees & Tops'
    }]
  }, {
    title: 'Accessories',
    items: [{
      title: 'Bags'
    }, {
      title: 'Belts'
    }, {
      title: 'Handbags & Wallets'
    }, {
      title: 'Hats & Hair Accessories'
    }, {
      title: 'Jewelry'
    }, {
      title: 'Luggage & Travel'
    }, {
      title: 'Scarves & Wraps'
    }, {
      title: 'Shoes & Sandels'
    }, {
      title: 'Sunglasses'
    }, {
      title: 'Watches'
    }]
  }
];
export default function Text() {
  return (
    <div className={ cx('text') }>
      {
        data.map(({ title, items }) => (
          <div className={ cx('category') }>
            <header><h4>{ title }</h4></header>
            <hr />
            <div className={ cx('content') }>
              {
                items.map(({ title, href = '#' }) => (
                  <a
                    className={ cx('item') }
                    href={ href }
                    >
                    <p>
                      { title }
                    </p>
                  </a>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}
Text.displayName = 'Text';
Text.propTypes = propTypes;
