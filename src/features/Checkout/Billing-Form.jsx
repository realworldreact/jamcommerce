import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';
import { CardElement, injectStripe } from 'react-stripe-elements';

import styles from './checkout.module.styl';
import {
  createTokenStart,
  createTokenComplete,
  createTokenError,
} from './redux';
import Input from '../Input';

const cx = classnames.bind(styles);
const propTypes = {
  createTokenComplete: PropTypes.func.isRequired,
  createTokenError: PropTypes.func.isRequired,
  createTokenStart: PropTypes.func.isRequired,
  stripe: PropTypes.object.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = {
  createTokenComplete,
  createTokenError,
  createTokenStart,
};

export class BillingForm extends PureComponent {
  handleSubmit = ({ name }) => {
    const {
      createTokenComplete,
      createTokenError,
      createTokenStart,
      stripe,
    } = this.props;
    createTokenStart();
    stripe
      .createToken({ name })
      .then(({ error, token }) => {
        if (error) {
          return Promise.reject(error);
        }
        return token;
      })
      .then(({ id: token, card }) => ({ ...card, token }))
      .then(createTokenComplete)
      .catch(createTokenError);
  }

  render() {
    return (
      <Form
        className={ cx('billing-form') }
        model='forms.billing'
        onSubmit={ this.handleSubmit }
        >
        <Input
          label='Name on Card'
          messages={ {
            length: 'Name should be at least 6 characters',
            required: 'Name is required',
          } }
          model='.name'
          type='text'
          validators={ {
            length: (val = '') => val.length > 6,
            required: (val = '') => val.length,
          } }
        />
        <label htmlFor='card'>
          Card Details
          <CardElement id='card' />
        </label>
        <button
          className={ cx('submit') }
          type='submit'
          >
          Confirm Card
        </button>
      </Form>
    );
  }
}

BillingForm.displayName = 'BillingForm';
BillingForm.propTypes = propTypes;

export default compose(
  injectStripe,
  connect(mapStateToProps, mapDispatchToProps),
)(BillingForm);
