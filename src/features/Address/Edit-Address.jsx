import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form, actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import styles from './address.module.styl';
import { AddressForm } from './';
import {
  submitNewAddress,
  addressSelector,
  showEditAddressModalSelector,
  updateEditAddress,
  closeEditAddress,
} from './redux';

const cx = classnames.bind(styles);

export function EditAddressDisplay({ handleSubmit, handleCancel }) {
  return (
    <div className={cx('add-address')}>
      <Form model="forms.editAddress" onSubmit={handleSubmit}>
        <AddressForm />
        <button className={cx('submit')} type="submit">
          Confirm Changes
        </button>
        <button className={cx('cancel')} onClick={handleCancel}>
          Cancel
        </button>
      </Form>
    </div>
  );
}
EditAddressDisplay.displayName = 'EditAddressDisplay';
EditAddressDisplay.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  address: PropTypes.object,
};

const mapStateToProps = createSelector(
  addressSelector,
  showEditAddressModalSelector,
  (addressMap, id) => ({
    address: addressMap[id],
  }),
);

const mapDispatchToProps = {
  submitNewAddress,
  updateEditAddress,
  closeEditAddress,
};

class EditAddress extends React.Component {
  componentDidMount() {
    this.props.updateEditAddress(this.props.address);
  }
  render() {
    const { submitNewAddress, address } = this.props;
    return (
      <div className={cx('add-address')}>
        <EditAddressDisplay
          handleSubmit={submitNewAddress}
          handleCancel={closeEditAddress}
        />
      </div>
    );
  }
}

EditAddress.displayName = 'EditAddress';
EditAddress.propTypes = {
  submitNewAddress: PropTypes.func.isRequired,
  address: PropTypes.object,
  updateEditAddress: PropTypes.func,
  closeEditAddress: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
