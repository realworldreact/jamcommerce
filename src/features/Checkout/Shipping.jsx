import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { createSelector } from 'reselect';
import Modal from 'react-modal';

import styles from './checkout.module.styl';
import AddressList from './Address-List.jsx';
import AddAddress from '../Address/Add-Address.jsx';
import { clickOnAddress } from './redux';
import {
  addressSelector,
  selectedAddressSelector,
  editAddress,
  deleteAddress,
} from '../Address/redux';
import EditAddressModal from '../Address/EditAddressModal';

const cx = classnames.bind(styles);
const propTypes = {
  addresses: PropTypes.array,
  selectedAddress: PropTypes.string,
  clickOnAddress: PropTypes.func.isRequired,
  isAddressListEmpty: PropTypes.bool,
  editAddress: PropTypes.func,
  deleteAddress: PropTypes.func,
};
const mapStateToProps = createSelector(
  addressSelector,
  selectedAddressSelector,
  (addressMap, selectedAddress) => ({
    addresses: Object.values(addressMap)
      .filter(v => v)
      .filter(v => v.hasOwnProperty('address1')),
    selectedAddress,
    isAddressListEmpty: _.isEmpty(addressMap),
  }),
);

const mapDispatchToProps = {
  clickOnAddress,
  editAddress,
  deleteAddress,
};

export class Shipping extends React.Component {
  componentDidMount() {
    Modal.setAppElement('#___gatsby');
  }

  render() {
    const {
      addresses,
      selectedAddress,
      clickOnAddress,
      editAddress,
      deleteAddress,
    } = this.props;
    return (
      <div className={cx('shipping')}>
        <AddressList
          addresses={addresses}
          clickOnAddress={clickOnAddress}
          deleteAddress={deleteAddress}
          editAddress={editAddress}
          selectedAddress={selectedAddress}
        />
        <div className={cx('shipping-content')}>
          <AddAddress />
        </div>
        <EditAddressModal />
      </div>
    );
  }
}
Shipping.displayName = 'Shipping';
Shipping.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
