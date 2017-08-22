const path = require('path');
const swiss = require('kouto-swiss');

module.exports = {
  siteMetadata: {
    title: 'JAMCommerce',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
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
  ],
};
