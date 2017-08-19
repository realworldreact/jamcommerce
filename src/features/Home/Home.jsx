import React, { Component } from 'react';
import classnames from 'classnames/bind';

import styles from './home.module.styl';
import featuredimg from './featured.png';
import Carousel from './Carousel.jsx';
import Subheader from './Subheader.jsx';
import Callout from '../Callout';
import Featured from './Featured.jsx';
import LearnMore from './Learn-More.jsx';
import callout from './callout.png';

const cx = classnames.bind(styles);
const propTypes = {};
const featured = [{
  img: featuredimg,
  price: 199.00,
  title: 'React'
}, {
  img: featuredimg,
  title: 'Webpack',
  price: 299.00,
  sale: 199.00
}, {
  img: featuredimg,
  title: 'Falcor',
  price: 299.00,
  sale: 199.00
}, {
  img: featuredimg,
  title: 'Graphql',
  price: 299.00
}];

export default class Home extends Component {
  render() {
    return (
      <div className={ cx('home') }>
        <Carousel />
        <Subheader />
        <div className={ cx('content-container') }>
          <Callout className={ cx('callout') }>
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
          </Callout>
          <div className={ cx('featured-container') }>
            {
              featured.map(featured => (
                <Featured
                  key={ featured.title }
                  { ...featured }
                />
              ))
            }
          </div>
        </div>
        <div className={ cx('prefooter') }>
          <h3>
            Learn More about the JAMstack from the links in the footer,
            or click around this example app to see how
            an e-commerce solution works with static tech!
          </h3>
        </div>
      </div>
    );
  }
}
Home.displayName = 'Home';
Home.propTypes = propTypes;
