import React, { Component } from 'react';
import classnames from 'classnames/bind';

import styles from './home.module.styl';
import FalcorImg from './falcor-front.png';
import GraphqlImg from './graphql-front.png';
import ReactImg from './react-front.png';
import WebpackImg from './webpack-front.png';
import Carousel from './Carousel.jsx';
import Subheader from './Subheader.jsx';
import Callout from '../Callout';
import Featured from './Featured.jsx';
import LearnMore from './Learn-More.jsx';
import callout from './callout.png';
import FadeIn from './FadeIn';

const cx = classnames.bind(styles);
const propTypes = {};
const featured = [
  {
    img: ReactImg,
    price: 199.0,
    title: 'React',
  },
  {
    img: WebpackImg,
    title: 'Webpack',
    price: 299.0,
    sale: 199.0,
  },
  {
    img: FalcorImg,
    title: 'Falcor',
    price: 299.0,
    sale: 199.0,
  },
  {
    img: GraphqlImg,
    title: 'Graphql',
    price: 299.0,
  },
];

export default class Home extends Component {
  render() {
    return (
      <div className={cx('home')}>
        <Carousel />
        <Subheader />
        <div className={cx('content-container')}>
          <Callout className={cx('callout')}>
            <header className={cx('copy')}>
              <h1 className={cx('title')}>Free & Open Source</h1>
              <p>
                JAM Commerce is completely free to use and modify as you like.
                Create your own version or fork it and contribute!
              </p>
              <LearnMore />
            </header>
            <FadeIn height={344}>
              {onLoad =>
                <img src={callout} className={cx('img')} onLoad={onLoad} />}
            </FadeIn>
          </Callout>
          <div className={cx('featured-container')}>
            {featured.map(featured =>
              <Featured key={featured.title} {...featured} />,
            )}
          </div>
        </div>
        <div className={cx('prefooter')}>
          <h4>
            Learn More about the JAMstack from the links in the footer, or click
            around this example app to see how JAM Commerce works!
          </h4>
          <a
            className={cx('github-mobile-fork-button')}
            href="https://github.com/realworldreact/jamcommerce"
          >
            Fork me on GitHub
          </a>
        </div>
      </div>
    );
  }
}
Home.displayName = 'Home';
Home.propTypes = propTypes;
