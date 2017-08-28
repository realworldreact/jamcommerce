const path = require('path');
const dedent = require('dedent');

exports.createPages = ({ boundActionCreators: { createPage } }) => {
  const productTemplate = path.resolve('src/features/Product/index.js');
  createPage({
    path: '/women/shoes',
    component: productTemplate,
    context: {
      callout: {
        title: 'A Revolution in E-Commerce ',
        copy: dedent`
          With the git-centric static workflow of Go Commerce, you can securely
          track your inventory, purchases, user history, and admin
          authentication — all from a lean, robust, and blazing fast
          architecture.
        `,
      },
    },
  });
};
