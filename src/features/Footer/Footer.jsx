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
  { name: 'Netlify', href: 'https://netlify.com' },
  { name: 'NetlifyCMS', href: 'https://www.netlifycms.org/' },
  { name: 'GoTell', href: 'https://github.com/netlify/gotell' },
  { name: 'Gotiator', href: 'https://github.com/netlify/gotiator' },
  { name: 'AWS Lambda', href: 'https://aws.amazon.com/lambda/ ' },
  { name: 'GoTrue', href: 'https://github.com/netlify/gotrue' },
];
const icons = [iconFB, iconIG, iconYT, iconTW];

// addon button
// <span className={ cx('addon', 'error') }>
//   <img src={ xIcon } />
// </span>

export default function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('first', 'top-row')}>
        <div className={cx('content')}>
          <h4>JAM Commerce</h4>
          <p>A headless e-commerce solution for JAMstack sites</p>
          <a href="https://github.com/netlify/gocommerce">
            View the code on GitHub
          </a>
        </div>
        <div className={cx('solutions')}>
          <h4>Other JAMStack solutions</h4>
          <div className={cx('solutions-container')}>
            {netlifySolutions.map(({ name, href }) =>
              <p key={name}>
                <a href={href}>
                  {name}
                </a>
              </p>,
            )}
          </div>
        </div>
      </div>
      <div className={cx('about', 'top-row')}>
        <div className={cx('content')}>
          <p>
            <a href="https://jamstack.org/">About JAMStack</a>
          </p>
          <p>
            <a href="https://www.heavybit.com/library/podcasts/jamstack-radio/">
              JAMstack Radio Podcast
            </a>
          </p>
          <p>
            <a href="">JAMStack Online Training</a>
          </p>
          <p>
            <a href="https://jamstack.org/community/">JAMStack Meetup</a>
          </p>
          <p>
            <a href="">MIT License</a>
          </p>
          <p>
            <a href="">See the Code</a>
          </p>
          <p>
            <a href="">Jobs</a>
          </p>
          <p>
            <a href="">Contact Us</a>
          </p>
        </div>
      </div>
      <div className={cx('newsletter', 'top-row')}>
        <div className={cx('content')}>
          <h3>JAMStack Newsletter</h3>
          <p>
            Join millions of people worldwide and stay up to date with our
            (non-spammy) newsletter
          </p>
          <div className={cx('input')}>
            <input placeholder="your@email.com" />
          </div>
          <button disabled={true} type="submit">
            Subscribe
          </button>
        </div>
      </div>
      <div className={cx('bottom')}>
        <div className={cx('icons')}>
          {icons.map(icon =>
            <div className={cx('icon')} key={icon}>
              <img src={icon} />
            </div>,
          )}
        </div>
        <div className={cx('created-by')}>
          <h4 className={cx('title')}>
            Created By <a href="https://www.netlify.com">Netlify</a>
          </h4>
          <h5 className={cx('byline')}>
            Template by{' '}
            <a href="https://www.realworldreact.com ">Real World React</a>
          </h5>
        </div>
      </div>
    </footer>
  );
}
Footer.displayName = 'Footer';
Footer.propTypes = propTypes;
