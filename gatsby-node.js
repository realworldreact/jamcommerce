const _ = require('lodash');
const crypto = require('crypto');
const path = require('path');
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

function transformYaml(actions, loadNodeContent, node) {
  const { createNode, createParentChildLink } = actions;
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
}

const isProduct = node => node && node.frontmatter && node.frontmatter.images;

const createSrcset = (imgs, { alt, sources }, side) => {
  imgs[side] = {
    alt,
    sources,
    src: sources[0] && sources[0].src,
    srcset: sources.map(({ width, src }) => `${src} ${width}`).join(', '),
  };
  return imgs;
};

function createProductNodes(createNode, oldNode) {
  const { frontmatter } = oldNode;
  const node = {
    ...frontmatter,
    children: [],
    id: frontmatter.name,
    parent: oldNode.id,
    thumbnails: _.reduce(
      frontmatter.thumbnails,
      createSrcset,
      {}
    ),
    images: _.reduce(
      frontmatter.images,
      createSrcset,
      {}
    ),
    internal: {
      type: 'JAMProduct',
    },
  };
  node.internal.contentDigest = crypto.createHash('md5')
    .update(JSON.stringify(node))
    .digest('hex');

  createNode(node);
}

exports.onCreateNode = ({
  node,
  loadNodeContent,
  boundActionCreators: actions,
}) => {
  if (node.internal.mediaType === 'text/yaml') {
    return transformYaml(actions, loadNodeContent, node);
  }
  if (isProduct(node)) {
    return createProductNodes(actions.createNode, node);
  }
  return undefined;
};
