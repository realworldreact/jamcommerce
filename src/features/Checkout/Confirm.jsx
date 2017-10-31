import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import styles from './checkout.module.styl';
import { clickOnConfirm } from './redux';
import { Table } from '../Cart';

const cx = classnames.bind(styles);
const propTypes = { clickOnConfirm: PropTypes.func.isRequired };
const mapStateToProps = null;
const mapDispatchToProps = { clickOnConfirm };

export function Confirm({ clickOnConfirm }) {
  return (
    <div className={ cx('confirm') }>
      <header>
        <h5>Please Review your cart order</h5>
      </header>
      <Table />
      <footer className={ cx('footer') }>
        <button
          className={ cx('next-button') }
          onClick={ clickOnConfirm }
          >
          Confirm Purchase
        </button>
      </footer>
    </div>
  );
}

Confirm.displayName = 'Confirm';
Confirm.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
