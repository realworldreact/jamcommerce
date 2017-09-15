import React from 'react';
import classnames from 'classnames/bind';

import styles from './auth.module.styl';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Auth() {
  return (
    <div className={ cx('auth') }>
      <div className='container'>
        <div></div>
        <form>
          <div className={ cx('input-control') }>
            <label>First Name</label>
            <input type='text' name='firstname'/>
            <div className={ cx('error') }></div>
          </div>
          <div className={ cx('input-control') }>
            <label>Last Name</label>
            <input type='text' name='lastname'/>
            <div className={ cx('error') }></div>
          </div>
          <div className={ cx('input-control') }>
            <label>Email Address</label>
            <input type='email' name='email'/>
            <div className={ cx('error') }></div>
          </div>
          <div className={ cx('input-control') }>
            <label>Pasword</label>
            <input type='password' name='password'/>
            <div className={ cx('error') }></div>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
}
Auth.displayName = 'Auth';
Auth.propTypes = propTypes;
