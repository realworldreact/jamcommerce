import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import _ from 'lodash';
import Modal from 'react-modal';

import styles from './address.module.styl';
import AddressDisplay from './Display';
import {
  addressSelector,
  showEditAddressModalSelector,
  editAddress,
  deleteAddress,
  closeEditAddress,
} from './redux';
import ViewHeader from './Header.jsx';
import AddAddress from './Add-Address';
import EditAddressModal from './EditAddressModal';

const cx = classnames.bind(styles);
const propTypes = {
  addresses: PropTypes.array,
  editAddress: PropTypes.func,
  deleteAddress: PropTypes.func,
  showEditAddressModal: PropTypes.string,
  closeEditAddress: PropTypes.func,
};

const mapStateToProps = createSelector(
  addressSelector,
  showEditAddressModalSelector,
  (addressMap, showEditAddressModal) => ({
    addresses: Object.values(addressMap)
      .filter(v => v)
      .filter(v => v.hasOwnProperty('address1')),
    showEditAddressModal,
  }),
);

const mapDispatchToProps = {
  editAddress,
  deleteAddress,
  closeEditAddress,
};

const modalStyles = {
  content: {
    padding: 'none',
  },
  overlay: {
    position: 'absolute',
    top: '80px',
    left: '120px',
    right: '120px',
    bottom: '80px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
};

class AddressList extends React.PureComponent {
  componentDidMount() {
    Modal.setAppElement('#___gatsby');
  }

  render() {
    const {
      addresses = [],
      editAddress,
      deleteAddress,
      showEditAddressModal,
      closeEditAddress,
    } = this.props;

    if (addresses.length > 0) {
      return (
        <div>
          <AddAddress />
          <ViewHeader>Your Addresses</ViewHeader>
          <div className={cx('list')}>
            <div className={cx('address-container')}>
              {addresses.map(address =>
                <div key={address.id} className={cx('address-subcontainer')}>
                  <AddressDisplay {...address} selected={false} simple={true} />
                  <div className={cx('address-controls')}>
                    <button onClick={() => editAddress(address.id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteAddress(address.id)}>
                      Delete
                    </button>
                  </div>
                </div>,
              )}
            </div>
            <EditAddressModal />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <AddAddress />
        </div>
      );
    }
  }
}
AddressList.displayName = 'AddressList';
AddressList.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
