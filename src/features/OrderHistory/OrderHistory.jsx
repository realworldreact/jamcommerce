import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './orderhistory.module.styl';

import { ordersSelector } from './redux';
import Order from './Order';

const cx = classnames.bind(styles);
const propTypes = {
  orders: PropTypes.array,
};
const mapStateToProps = createSelector(ordersSelector, orders => ({
  orders,
}));

const mapDispatchToProps = {};

export class OrderHistory extends Component {
  render() {
    const { orders } = this.props;
    console.log(orders);

    return (
      <div className={cx('orderHistory')}>
        <hr />
        {orders.map(order => <Order {...order} />)}
      </div>
    );
  }
}

OrderHistory.displayName = 'OrderHistory';
OrderHistory.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
