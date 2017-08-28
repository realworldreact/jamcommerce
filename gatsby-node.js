const path = require('path');
const crypto = require('crypto');
const _ = require('lodash');
const yaml = require('js-yaml');

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) => {
  const productTemplate = path.resolve('src/features/Product/index.js');
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              name
              description
              price
              sale
            }
          }
        }
      }
      productYaml {
        callout {
          description
          title
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      console.log('res.errors: ', res.errors);
      throw res.errors;
    }
    const copy = res.data.productYaml;
    const products = res.data.allMarkdownRemark.edges.map(
      ({ node }) => node.frontmatter,
    );
    createPage({
      path: '/women/shoes',
      component: productTemplate,
      context: {
        ...copy,
        products,
      },
    });
  });
};

exports.onCreateNode = ({
  node,
  loadNodeContent,
  boundActionCreators: { createNode, createParentChildLink },
}) => {
  if (node.internal.mediaType !== 'text/yaml') {
    return null;
  }

  function objToNode(obj, i) {
    const objStr = JSON.stringify(obj);
    const contentDigest = crypto.createHash('md5').update(objStr).digest('hex');

    return {
      ...obj,
      id: obj.id ? obj.id : `${node.id} [${i}] >>> YAML`,
      children: [],
      parent: node.id,
      internal: {
        contentDigest,
        // TODO make choosing the "type" a lot smarter. This assumes
        // the parent node is a file.
        // PascalCase
        type: _.upperFirst(_.camelCase(`${node.name} Yaml`)),
      },
    };
  }

  return loadNodeContent(node)
    .then(content => yaml.safeLoad(content))
    .then(contents => {
      if (!_.isArray(contents)) {
        contents = [ contents ];
      }
      return {
        parent: node,
        nodes: contents.map(objToNode),
      };
    })
    .then(({ parent, nodes }) =>
      nodes.map(child => {
        createNode(child);
        createParentChildLink({ parent, child });
        return null;
      }),
    );
};
