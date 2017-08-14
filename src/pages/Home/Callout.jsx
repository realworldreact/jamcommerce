import React from 'react';
import classnames from 'classnames/bind';

import styles from './home.module.styl';
import callout from './callout.png';
import LearnMore from './Learn-More.jsx';

const cx = classnames.bind(styles);
const propTypes = {};

export default function CallOut() {
  return (
    <div className={ cx('callout') }>
      <header className={ cx('copy') }>
        <h1 className={ cx('title') }>Nothing to Hack</h1>
        <p>
          Because your app is rendered in pure static HTML, there is virtually
          no risk of SQL injection, malware attacks, or other nefarious hackery.
        </p>
        <LearnMore />
      </header>
      <img
        className={ cx('img') }
        src={ callout }
      />
    </div>
  );
}
CallOut.displayName = 'CallOut';
CallOut.propTypes = propTypes;
