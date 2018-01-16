import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import format from 'date-fns/format';

import styles from './orderhistory.module.styl';
import RightTriangle from './RightTriangle.svg';

const cx = classnames.bind(styles);

const Order = ({ created_at, line_items }) =>
  <div className={cx('order')}>
    <h4>
      {format(created_at, 'MMMM Do, YYYY')}
    </h4>
    <div>
      <h4>
        {line_items[0]}
      </h4>
      {line_items.length > 1 ? `and ${line_items.length - 1} other item` : ''}
    </div>
    <h4>
      Full Details <img alt="" src={RightTriangle} />
    </h4>
  </div>;

Order.propTypes = {
  created_at: PropTypes.string,
  line_items: PropTypes.array,
};

export default Order;
