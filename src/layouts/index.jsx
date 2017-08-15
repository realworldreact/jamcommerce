import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './index.styl';
import Nav from './Nav';
import Footer from './Footer';

export default function TemplateWrapper({ children }) {
  return (
    <div>
      <Helmet
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' }
        ]}
        title='JamCommerce'
      />
      <Nav />
      <div>
        { children() }
      </div>
      <Footer />
    </div>
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
};
