import React from 'react';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';

import styles from './auth.module.styl';
import Input from '../Input';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Auth() {
  return (
    <div className={ cx('auth') }>
      <div className={ cx('container') }>
        <header className={ cx('header') }>
          <div>
            <h4>Sign In</h4>
          </div>
          <div>
            <h4>Sign Up</h4>
          </div>
        </header>
        <Form
          className={ cx('form') }
          model='user'
          >
          <Input
            label='First Name'
            messages={ {
              length: 'First name must be atleast 6 charectors',
              required: 'First Name is required',
            } }
            model='user.firstname'
            type='text'
            validators={ {
              length: (val = '') => val.length > 6,
              required: (val = '') => val.length,
            } }
          />
          <Input
            label='Last Name'
            model='user.lastname'
            type='text'
          />
          <Input
            label='Email Address'
            model='user.email'
            type='email'
          />
          <Input
            label='Password'
            model='user.password'
            type='password'
          />
          <button
            className={ cx('submit') }
            type='submit'
            >
            Submit
          </button>
        </Form>
        <div />
      </div>
    </div>
  );
}
Auth.displayName = 'Auth';
Auth.propTypes = propTypes;
