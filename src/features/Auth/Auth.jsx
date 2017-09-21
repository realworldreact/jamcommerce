import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';
import Link from 'gatsby-link';
import isEmail from 'validator/lib/isEmail';

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
          model='forms.user'
          >
          { isSignin &&
            <div>
              <Input
                label='First Name'
                messages={ {
                  length: 'Firstname must be at least 2 characters',
                  required: 'Firstname is required',
                } }
                model='user.firstname'
                type='text'
                validators={ {
                  length: (val = '') => val.length > 2,
                  required: (val = '') => val.length,
                } }
              />
              <Input
                label='Last Name'
                messages={ {
                  length: 'Lastname must be at least 2 characters',
                  required: 'Lastname is required',
                } }
                model='user.lastname'
                type='text'
                validators={ {
                  length: (val = '') => val.length > 2,
                  required: (val = '') => val.length,
                } }
              />
            </div> }
          <Input
            label='Email Address'
            messages={ {
              isEmail: 'Email is not currectly formatted',
            } }
            model='user.email'
            type='email'
            validators={ {
              isEmail: (val = '') => isEmail(val),
            } }
          />
          <Input
            label='Password'
            messages={ {
              length: 'Password must be at least 6 characters',
            } }
            model='user.password'
            type='password'
            validators={ {
              length: (val = '') => val.length > 6,
            } }
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
