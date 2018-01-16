import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import format from 'date-fns/format';

import styles from './orderhistory.module.styl';
import RightTriangle from './RightTriangle.svg';

const cx = classnames.bind(styles);

const propTypes = {
  created_at: PropTypes.string,
  line_items: PropTypes.array,
};
class Order extends Component {
  render() {
    const { created_at, line_items } = this.props;

    return (
      <div>
        <div className={cx('order')}>
          <h4>
            {format(created_at, 'MMMM Do, YYYY')}
          </h4>
          <div>
            <h4>
              {line_items[0].title}
            </h4>
            <p>
              {line_items.length > 1
                ? `and ${line_items.length - 1} other item`
                : ''}
            </p>
          </div>
          <h4>
            Full details <img alt="" src={RightTriangle} />
          </h4>
        </div>
        <hr />
      </div>
    );
  }
}

Order.propTypes = propTypes;

export default Order;
