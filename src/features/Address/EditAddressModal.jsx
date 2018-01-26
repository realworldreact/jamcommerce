import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import Modal from 'react-modal';
import { createSelector } from 'reselect';

import EditAddress from './Edit-Address';
import ViewHeader from './Header.jsx';
import { showEditAddressModalSelector, closeEditAddress } from './redux';
import styles from './address.module.styl';
import CloseButton from '../CloseButton';

const cx = classnames.bind(styles);

const mapStateToProps = createSelector(
  showEditAddressModalSelector,
  showEditAddressModal => ({
    showEditAddressModal,
  }),
);

const mapDispatchToProps = {
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

export const EditAddressModal = ({ showEditAddressModal, closeEditAddress }) =>
  <Modal isOpen={!!showEditAddressModal} style={modalStyles}>
    <div className={cx('address-edit-container')}>
      <div className={cx('address-edit-content')}>
        <ViewHeader>Edit Address</ViewHeader>
        <EditAddress />
      </div>
      <CloseButton onClick={closeEditAddress} />
    </div>
  </Modal>;

EditAddressModal.propTypes = {
  showEditAddressModal: PropTypes.string,
  closeEditAddress: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAddressModal);
