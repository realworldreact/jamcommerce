import React from 'react';
import classnames from 'classnames/bind';

import styles from './footer.module.styl';
import iconFB from './icon-facebook.png';
import iconIG from './icon-instagram.png';
import iconTW from './icon-twitter.png';
import iconYT from './icon-youtube.png';
// import checkIcon from './icon-check.svg';
// import xIcon from './icon-x.svg';

const cx = classnames.bind(styles);
const propTypes = {};
const netlifySolutions = [
  { name: 'Netlify', src: 'https://netlify.com' },
  { name: 'NetlifyCMS', src: '' },
  { name: 'GoTell', src: '' },
  { name: 'Gotiator', src: '' },
  { name: 'AWS Lambda', src: '' },
  { name: 'Serverless', src: '' },
];
const icons = [
  iconFB,
  iconIG,
  iconYT,
  iconTW,
];

// addon button
// <span className={ cx('addon', 'error') }>
//   <img src={ xIcon } />
// </span>

export default function Footer() {
  return (
    <footer className={ cx('footer') }>
      <div className={ cx('first', 'top-row') }>
        <div className={ cx('content') }>
          <h4>JAM Commerce</h4>
          <p>A headless e-commerce solution for JAMstack sites</p>
          <a src='https://github.com/'>View the code on GitHub</a>
        </div>
        <div className={ cx('solutions') }>
          <h4>Other JAMStack solutions</h4>
          <div className={ cx('solutions-container') }>
            { netlifySolutions.map(({ name, src }) =>
              (
                <p key={ name }>
                  <a src={ src }>
                    { name }
                  </a>
                </p>
              ),
            ) }
          </div>
        </div>
      </div>
      <div className={ cx('about', 'top-row') }>
        <div className={ cx('content') }>
          <p>
            <a src=''>About JAMStack</a>
          </p>
          <p>
            <a src=''>JAMstack Radio Podcast</a>
          </p>
          <p>
            <a src=''>JAMStack Online Training</a>
          </p>
          <p>
            <a src=''>JAMStack Meetup</a>
          </p>
          <p>
            <a src=''>MIT License</a>
          </p>
          <p>
            <a src=''>See the Code</a>
          </p>
          <p>
            <a src=''>Jobs</a>
          </p>
          <p>
            <a src=''>Contact Us</a>
          </p>
        </div>
      </div>
      <div className={ cx('newsletter', 'top-row') }>
        <div className={ cx('content') }>
          <h3>JAMStack Newsletter</h3>
          <p>
            Join millions of people worldwide and stay up to date with our
            (non-spammy) newsletter
          </p>
          <div className={ cx('input') }>
            <input placeholder='your@email.com' />
          </div>
          <button
            disabled={ true }
            type='submit'
            >
            Subscribe
          </button>
        </div>
      </div>
      <div className={ cx('bottom') }>
        <div className={ cx('icons') }>
          { icons.map(icon =>
            (
              <div
                className={ cx('icon') }
                key={ icon }
                >
                <img src={ icon } />
              </div>
            ),
          ) }
        </div>
        <div className={ cx('created-by') }>
          <h4 className={ cx('title') }>Created By Netlify</h4>
          <h5 className={ cx('byline') }>Template by Real World React</h5>
        </div>
      </div>
    </footer>
  );
}
Footer.displayName = 'Footer';
Footer.propTypes = propTypes;
