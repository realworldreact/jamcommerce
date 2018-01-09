import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { Form } from 'react-redux-form';
import Link from 'gatsby-link';
import isEmail from 'validator/lib/isEmail';

import styles from './auth.module.styl';
import Input from '../Input';
import { onSigninSubmit, onSignupSubmit } from './redux';

const cx = classnames.bind(styles);
const propTypes = {
  location: PropTypes.object,
  onSigninSubmit: PropTypes.func.isRequired,
  onSignupSubmit: PropTypes.func.isRequired,
  loginMessage: PropTypes.string,
  loginError: PropTypes.string,
};

const mapStateToProps = state => (
  console.log(state),
  {
    loginError: state.Auth.loginError,
    loginMessage: state.Auth.loginMessage,
  }
);
const mapDispatchToProps = {
  onSigninSubmit,
  onSignupSubmit,
};

export function Auth({
  loginError,
  loginMessage,
  location,
  onSigninSubmit,
  onSignupSubmit,
}) {
  const isSignin = location.pathname === '/signin';
  const handleSubmit = isSignin ? onSigninSubmit : onSignupSubmit;
  return (
    <div className={cx('auth')}>
      <div className={cx('container')}>
        <header className={cx('header')}>
          <Link to="/signup">
            <div className={cx({ underline: !isSignin })}>
              <h4>Sign Up</h4>
            </div>
          </Link>
          <Link to="/signin">
            <div className={cx({ underline: isSignin })}>
              <h4>Sign In</h4>
            </div>
          </Link>
        </header>
        <Form className={cx('form')} model="forms.user" onSubmit={handleSubmit}>
          {!isSignin &&
            <div>
              <Input
                label="First Name"
                messages={{
                  length: 'First name must be at least 2 characters',
                  required: 'First name is required',
                }}
                model=".firstname"
                type="text"
                validators={{
                  length: (val = '') => val.length > 2,
                  required: (val = '') => val.length,
                }}
              />
              <Input
                label="Last Name"
                messages={{
                  length: 'Last name must be at least 2 characters',
                  required: 'Last name is required',
                }}
                model=".lastname"
                type="text"
                validators={{
                  length: (val = '') => val.length > 2,
                  required: (val = '') => val.length,
                }}
              />
            </div>}

          {loginMessage && isSignin
            ? <p>
                {loginMessage}
              </p>
            : null}
          <Input
            label="Email Address"
            messages={{
              isEmail: 'Email is not currectly formatted',
            }}
            model=".email"
            type="email"
            validators={{
              isEmail: (val = '') => isEmail(val),
            }}
          />
          <Input
            label="Password"
            messages={{
              length: 'Password must be at least 6 characters',
            }}
            model=".password"
            type="password"
            validators={{
              length: (val = '') => val.length > 6,
            }}
          />
          {loginError && isSignin
            ? <p>
                {loginError}
              </p>
            : null}
          <button className={cx('submit')} type="submit">
            Let's GO!
          </button>
        </Form>
        <div />
      </div>
    </div>
  );
}
Auth.displayName = 'Auth';
Auth.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
