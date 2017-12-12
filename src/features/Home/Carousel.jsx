import _ from 'lodash';
import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { Frame, Track, View, ViewPager } from 'react-view-pager';

import styles from './home.module.styl';
import ProgressPage from './Progress-Page.jsx';
import banner1 from './banner-1.png';
import banner2 from './banner-2.png';
import banner3 from './banner-3.png';

const cx = classnames.bind(styles);
const propTypes = {};
const bannerTimeout = 3000;
const banners = [
  banner1,
  banner2,
  banner3,
];

export default class Carousel extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      currentView: banners[0],
    };
    banners.forEach((src, index) => {
      this['@@' + src] = () => this.setState({ currentView: index });
    });
  }
  componentDidMount() {
    this._key = setInterval(() => {
      let { currentView } = this.state;
      if (typeof currentView === 'string') {
        currentView = _.findIndex(banners, src => src === currentView);
      }
      this.setState({
        currentView: (currentView + 1) % banners.length,
      });
    }, bannerTimeout);
  }
  componentWillUnmount() {
    if (this._key) {
      clearInterval(this._key);
    }
  }

  handleViewChange = indicies => this.setState({ currentView: indicies[0] })
  handleProgressClick = index => {
    // this forces this component to re-render after view has finished
    // scrolling. Otherwise we wouldn't need this state;
    this.setState({ currentView: index });
  }

  handleScroll = progress => {
    this.setState({ progress });
  }

  frameRef = frame => {
    this.frame = frame;
  }

  render() {
    const { currentView } = this.state;
    return (
      <ViewPager className={ cx('carousel') }>
        <Frame ref={ this.frameRef }>
          <Track
            currentView={ currentView }
            onScroll={ this.handleScroll }
            onViewChange={ this.handleViewChange }
            >
            { banners.map(src =>
              (
                <View
                  className={ cx('pager-container') }
                  key={ src }
                  >
                  <img
                    alt='foo'
                    className={ cx('pager-img') }
                    src={ src }
                  />
                  <h2 className={ cx('pager-copy-top') }>
                    <span>Dynamically</span>
                  </h2>
                  <h1 className={ cx('pager-copy-bottom') }>
                    <span>STATIC</span>
                  </h1>
                  <hr className={ cx('pager-hr') } />
                  <span className={ cx('pager-footer') }>
                  Fast, Secure, & Infinitely Scalable
                  </span>
                </View>
              ),
            ) }
          </Track>
          <nav className={ cx('pager-nav') }>
            { banners.map((src, index) =>
              (
                <ProgressPage
                  className={ cx('page') }
                  index={ index }
                  key={ src }
                  onClick={ this['@@' + src] }
                />
              ),
            ) }
          </nav>
        </Frame>
      </ViewPager>
    );
  }
}

Carousel.displayName = 'Carousel';
Carousel.propTypes = propTypes;
