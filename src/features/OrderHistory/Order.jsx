import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import format from 'date-fns/format';
import _ from 'lodash';

import styles from './orderhistory.module.styl';
import { Table } from '../Cart/Table';

const cx = classnames.bind(styles);
const propTypes = {
  created_at: PropTypes.string,
  line_items: PropTypes.array,
};

class Order extends Component {
  render() {
    const { created_at, line_items } = this.props;

    const total = {
      amount: line_items.reduce(
        (sum, { price, quantity }) => sum + price * quantity / 100,
        0,
      ),
    };

    const items = line_items.map(
      ({ title, sku, price, quantity, meta: { size, image } }) => ({
        image,
        quantity,
        size,
        sku,
        title,
        price: {
          amount: String(price / 100),
        },
        total: {
          amount: String(price / 100 * quantity),
        },
      }),
    );

    return (
      <div className={cx('order')}>
        <header>
          <h4>
            {format(created_at, 'MMMM Do, YYYY')}
          </h4>
        </header>
        <Table
          clickOnRemove={_.noop}
          editable={false}
          items={items}
          total={total}
        />
      </div>
    );
  }
}
Order.propTypes = propTypes;

export default Order;
