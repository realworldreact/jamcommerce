import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import styles from './address.module.styl';
import { AddressForm } from './';
import {
  clickOnAddAddress,
  clickOnCancelAddAddress,
  submitNewAddress,
  showAddAddressSelector,
} from './redux';

const cx = classnames.bind(styles);

export function AddAddressDisplay({ clickOnCancelAddAddress, handleSubmit }) {
  return (
    <div className={cx('add-address')}>
      <header>
        <h4>Add New Address</h4>
        <button className={cx('cancel')} onClick={clickOnCancelAddAddress}>
          Cancel
        </button>
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
AddAddressDisplay.displayName = 'AddAddressDisplay';
AddAddressDisplay.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clickOnCancelAddAddress: PropTypes.func,
};

const mapStateToProps = createSelector(
  showAddAddressSelector,
  showAddAddress => ({
    showAddAddress,
  }),
);

const mapDispatchToProps = {
  clickOnAddAddress,
  clickOnCancelAddAddress,
  submitNewAddress,
};

const AddAddress = ({
  showAddAddress,
  submitNewAddress,
  clickOnAddAddress,
  clickOnCancelAddAddress,
}) =>
  <div className={cx('add-address')}>
    {!showAddAddress &&
      <button className={cx('add-button')} onClick={clickOnAddAddress}>
        Add Address
      </button>}
    {showAddAddress &&
      <AddAddressDisplay
        clickOnCancelAddAddress={clickOnCancelAddAddress}
        handleSubmit={submitNewAddress}
      />}
  </div>;

AddAddress.displayName = 'AddAddress';
AddAddress.propTypes = {
  clickOnAddAddress: PropTypes.func.isRequired,
  clickOnCancelAddAddress: PropTypes.func.isRequired,
  showAddAddress: PropTypes.bool,
  submitNewAddress: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
