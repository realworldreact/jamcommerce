import React, { Component } from 'react';
import classnames from 'classnames/bind';

import styles from './home.module.styl';
import featuredimg from './featured.png';
import Carousel from './Carousel.jsx';
import Subheader from './Subheader.jsx';
import Callout from './Callout.jsx';
import Featured from './Featured.jsx';

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
          <Callout />
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
      </div>
    );
  }
}
Home.displayName = 'Home';
Home.propTypes = propTypes;
