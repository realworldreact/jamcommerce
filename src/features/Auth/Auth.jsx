import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';
import Link from 'gatsby-link';

import styles from './auth.module.styl';
import Input from '../Input';

const cx = classnames.bind(styles);
const propTypes = {
  location: PropTypes.object,
};

export default function Auth({ location }) {
  const isSignin = location.pathname === '/signin';
  return (
    <div className={ cx('auth') }>
      <div className={ cx('container') }>
        <header className={ cx('header') }>
          <Link to='/signin'>
            <div className={ cx({ underline: isSignin }) }>
              <h4>Sign In</h4>
            </div>
          </Link>
          <Link to='/signup'>
            <div className={ cx({ underline: !isSignin }) }>
              <h4>Sign Up</h4>
            </div>
          </Link>
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
