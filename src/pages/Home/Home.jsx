import React, { Component } from 'react';
import classnames from 'classnames/bind';

import styles from './home.module.styl';
import Carousel from './Carousel.jsx';

const cx = classnames.bind(styles);
const propTypes = {};

export default class Home extends Component {
  render() {
    return (
      <div className={ cx('home') }>
        <Carousel />
      </div>
    );
  }
}
Home.displayName = 'Home';
Home.propTypes = propTypes;
