const path = require('path');
const crypto = require('crypto');
const _ = require('lodash');
const yaml = require('js-yaml');

exports.createPages = ({ boundActionCreators: { createPage } }) => {
  const productTemplate = path.resolve('src/templates/products.js');
  createPage({
    path: '/women/shoes',
    component: productTemplate,
    context: {
      category: 'shoes',
      directory: 'women',
    },
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
