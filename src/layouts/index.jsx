import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames/bind';

import './index.styl';
import styles from './main.module.styl';
import { appMounted } from '../features/redux';
import Nav from '../features/Nav';
import Footer from '../features/Footer';

const cx = classnames.bind(styles);
const mapStateToProps = null;
const mapDispatchToProps = {
  appMounted,
};

const propTypes = {
  appMounted: PropTypes.func.isRequired,
  children: PropTypes.func,
};

export class TemplateWrapper extends PureComponent {
  componentDidMount() {
    this.props.appMounted();
  }

  render() {
    const { children } = this.props;
    return (
      <div className={cx('main')}>
        <Helmet
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          title="JamCommerce"
        />
        <Nav />
        <div className={cx('content')}>
          {children()}
        </div>
        <Footer />
      </div>
    );
  }
}

TemplateWrapper.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(TemplateWrapper);
