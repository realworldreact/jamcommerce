import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';

import styles from './checkout.module.styl';
import { AddressForm } from '../Address';

const cx = classnames.bind(styles);
const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default function AddAddress({ handleSubmit }) {
  return (
    <div className={cx('add-address')}>
      <header>
        <h4>Add New Address</h4>
      </header>
      <Form model="forms.newAddress" onSubmit={handleSubmit}>
        <AddressForm />
        <button className={cx('submit')} type="submit">
          Save Address
        </button>
      </Form>
    </div>
  );
}
AddAddress.displayName = 'AddAddress';
AddAddress.propTypes = propTypes;
