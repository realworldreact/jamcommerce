const path = require('path');
const swiss = require('kouto-swiss');

module.exports = {
  siteMetadata: {
    title: 'JAMCommerce',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'cms',
    {
      resolve: 'stylus',
      options: {
        use: [ swiss() ],
        import: [
          '~kouto-swiss/lib/kouto-swiss/index.styl',
          path.join(__dirname, 'src/globals.styl'),
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/**/*`,
        name: 'cms',
      },
    },
    'gatsby-transformer-remark',
  ],
};
