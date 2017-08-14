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
      <div><h1>Nothing to Hack</h1></div>
      <div>
Because your app is rendered in pure static HTML, there is virtually no risk of
SQL injection, malware attacks, or other nefarious hackery.
      </div>
      <LearnMore />
      <div>
        <img
          className={ cx('img') }
          src={ callout }
        />
      </div>
    </div>
  );
}
CallOut.displayName = 'CallOut';
CallOut.propTypes = propTypes;
