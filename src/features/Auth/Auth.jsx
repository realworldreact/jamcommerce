import React from 'react';
import classnames from 'classnames/bind';
import { Control, Form } from 'react-redux-form';

import styles from './auth.module.styl';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Auth() {
  return (
    <div className={ cx('auth') }>
      <div className='container'>
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
          <div className={ cx('input-control') }>
            <label htmlFor='user.firstname'>
              First Name
              <Control.text model='user.firstname' />
            </label>
            <div className={ cx('error') } />
          </div>
          <div className={ cx('input-control') }>
            <label htmlFor='user.lastname'>
              Last Name
              <Control.text model='user.lastname' />
            </label>
            <div className={ cx('error') } />
          </div>
          <div className={ cx('input-control') }>
            <label htmlFor='user.email'>
              Email Address
              <Control
                model='user.email'
                type='email'
              />
            </label>
            <div className={ cx('error') } />
          </div>
          <div className={ cx('input-control') }>
            <label htmlFor='user-password'>
              Password
              <Control
                model='user.password'
                type='password'
              />
            </label>
            <div className={ cx('error') } />
          </div>
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
