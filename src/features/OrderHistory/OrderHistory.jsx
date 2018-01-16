import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';

import styles from './orderhistory.module.styl';
import LeftTriangle from './LeftTriangle.svg';

import {
  ordersSelector,
  currentOrderSelector,
  showOrderDetails,
  showOrderDetailsSelector,
  backToHistory,
} from './redux';
import OrderRow from './OrderRow';
import Order from './Order';

const cx = classnames.bind(styles);
const propTypes = {
  orders: PropTypes.array,
  showSingleOrder: PropTypes.bool,
  currentOrder: PropTypes.object,
  showOrderDetails: PropTypes.func,
  backToHistory: PropTypes.func,
};
const mapStateToProps = createSelector(
  ordersSelector,
  currentOrderSelector,
  showOrderDetailsSelector,
  (orders, currentOrder, showingOrderDetails) => ({
    orders,
    currentOrder,
    showingOrderDetails,
  }),
);

const mapDispatchToProps = { showOrderDetails, backToHistory };

export class OrderHistory extends Component {
  showOrderDetails(order) {
    this.props.showOrderDetails(order);
  }

  render() {
    const {
      orders,
      showingOrderDetails,
      showOrderDetails,
      currentOrder,
      backToHistory,
    } = this.props;

    if (showingOrderDetails) {
      return (
        <div className={cx('orderHistory')}>
          <Order {...currentOrder} />
          <h4 onClick={backToHistory}>
            <img alt="" src={LeftTriangle} />Back to History
          </h4>
        </div>
      );
    } else {
      return (
        <div className={cx('orderHistory')}>
          <hr />
          {orders.map(order =>
            <OrderRow
              {...order}
              key={order.id}
              showOrderDetails={() => this.showOrderDetails(order)}
            />,
          )}
        </div>
      );
    }
  }
}

OrderHistory.displayName = 'OrderHistory';
OrderHistory.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
