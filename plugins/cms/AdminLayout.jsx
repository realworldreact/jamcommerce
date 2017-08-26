import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function AdminLayout() {
  return (
    <div>
      <Helmet
        meta={ [
          { name: 'Netlify-CMS Admin', content: 'Sample' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        ] }
        title='Netlify-CMS'
        >
        <link
          href='/cms.css'
          rel='stylesheet'
        />
        <script src='/cms.js' />
      </Helmet>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.func,
};
