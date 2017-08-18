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
        <div><h1 className={ cx('title') }>Undeniably Hip</h1></div>
        <div className={ cx('copy') }>
Static sites are en vogue not because they’re a fashion trend, but because the
JAMstack represents the best parts of the full-stack architecture we’ve come to
love — without the security risk, complexity, or maintenance costs.
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
        <div><h1 className={ cx('title') }>Accessories Galore</h1></div>
        <p className={ cx('copy') }>
With the JAMstack, you can add microservices as you require such as forms,
databases as a service, blog CMS, comments, or this e-commerce solution — while
maintaining the benefits of going static.
        </p>
        <LearnMore />
      </div>
    </div>
  );
}
Subheader.displayName = 'Subheader';
Subheader.propTypes = propTypes;
