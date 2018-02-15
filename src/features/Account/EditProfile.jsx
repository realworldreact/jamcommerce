import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';

import styles from './account.module.styl';
import ProfileForm from './ProfileForm';
import { updateProfileForm } from './redux';
import { emailSelector, userSelector } from '../Auth/redux';

const cx = classnames.bind(styles);

const mapStateToProps = state => (
  console.log(state),
  {
    profile: {
      email: emailSelector(state),
      firstname: userSelector(state).firstname,
      lastname: userSelector(state).lastname,
    },
  }
);
const mapDispatchToProps = {
  updateProfileForm,
};

class EditProfile extends Component {
  componentDidMount() {
    this.props.updateProfileForm(this.props.profile);
  }

  render() {
    const { onCancelEdit, handleSubmit } = this.props;

    return (
      <div>
        <h3>Edit Profile</h3>
        <Form model="forms.profile" onSubmit={handleSubmit}>
          <ProfileForm />
          <button className={cx('submit')} type="submit">
            Confirm Changes
          </button>
          <br />
          <button className={cx('cancel')} onClick={onCancelEdit}>
            Cancel
          </button>
        </Form>
      </div>
    );
  }
}
EditProfile.propTypes = {
  handleSubmit: PropTypes.func,
  onCancelEdit: PropTypes.func,
  updateProfileForm: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
