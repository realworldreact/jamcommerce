import React from 'react';
import classnames from 'classnames/bind';

import styles from './home.module.styl';
import subheader1 from './subheader-1.png';
import subheader2 from './subheader-2.png';
import LearnMore from './Learn-More.jsx';

const cx = classnames.bind(styles);
const propTypes = {};

export default function Subheader() {
  return (
    <div className={ cx('subheader') }>
      <div className={ cx('subheader-container') }>
        <div>
          <img
            className={ cx('img') }
            src={ subheader1 }
          />
        </div>
        <div>
          <h2 className={ cx('title') }>Get up and running fast</h2>
        </div>
        <div className={ cx('copy') }>
          JAM Commerce has a minimal learning curve. If you know how to
          fetch an API and are familiar with Git, you can make your
          front-end code a full-stack e-commerce solution in record time.
        </div>
        <LearnMore />
      </div>
      <div className={ cx('subheader-container') }>
        <div>
          <img
            className={ cx('img') }
            src={ subheader2 }
          />
        </div>
        <div>
          <h2 className={ cx('title') }>Use tech that you love</h2>
        </div>
        <p className={ cx('copy') }>
          JAM Commerce is headless, meaning you can use whatever front-end
          you'd like. You can also update and modify your stack by simply
          reconnecting the API endpoints. For this example app, we used the
          Gatsby static-site generator and some cool other tools.
        </p>
        <LearnMore />
      </div>
    </div>
  );
}
Subheader.displayName = 'Subheader';
Subheader.propTypes = propTypes;
