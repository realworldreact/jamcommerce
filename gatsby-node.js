const _ = require('lodash');
const crypto = require('crypto');
const path = require('path');
const yaml = require('js-yaml');

const createSlug = _.flow([
  s => s.toLowerCase(),
  _.partialRight(_.replace, ' ', '-'),
  _.partialRight(_.replace, '.', ''),
  _.escape,
]);

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) => {
  const productsTemplate = path.resolve('src/templates/products.js');
  const productTemplate = path.resolve('src/templates/product.js');
  createPage({
    path: '/women/shoes',
    component: productsTemplate,
    context: {
      category: 'shoes',
      directory: 'women',
    },
  });
  return graphql(`
    {
      allJamProduct {
        edges {
          node {
            id
            name,
            slug
          }
        }
      }
    }
  `).then(({ errors, data: { allJamProduct: { edges } } } = null) => {
    if (errors) {
      throw errors;
    }
    edges.map(({ node }) => node).forEach(({ id, name, slug }) => {
      createPage({
        path: `/women/shoes/${slug}`,
        component: productTemplate,
        context: {
          id,
          name,
        },
      });
    });
    return undefined;
  });
};

function transformYaml(actions, loadNodeContent, node) {
  const { createNode } = actions;
  function objToNode(obj, i) {
    const isCopy = (/copy$/).test(node.dir);
    const objStr = JSON.stringify(obj);
    const contentDigest = crypto.createHash('md5').update(objStr).digest('hex');
    const type = isCopy ?
      'JAMCopy' :
      _.upperFirst(_.camelCase(`${node.name}Yaml`));
    let id = obj.id;
    if (!id && isCopy) {
      if (isCopy) {
        id = `Copy-${node.name}`;
      } else {
        id = `${node.id} [${i}] >>> Yaml`;
      }
    }

    const newNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest,
        // TODO make choosing the "type" a lot smarter. This assumes
        // the parent node is a file.
        // PascalCase
        type,
      },
    };
    if (isCopy) {
      newNode.name = node.name;
    }
    return newNode;
  }

  return loadNodeContent(node)
    .then(content => yaml.safeLoad(content))
    .then(contents => {
      if (!_.isArray(contents)) {
        contents = [ contents ];
      }
      return contents.map(objToNode);
    })
    .then(nodes => nodes.map(child => createNode(child)));
}

const isProduct = node => node && node.frontmatter && node.frontmatter.images;

const createSrcset = (imgs, { alt, sources }, side) => {
  imgs[side] = {
    alt,
    sources,
    src: sources[0] && sources[0].src,
    srcSet: sources.map(({ width, src }) => `${src} ${width}`).join(', '),
  };
  return imgs;
};

function createProductNodes(createNode, oldNode) {
  const { frontmatter } = oldNode;
  const slug = createSlug(frontmatter.name);
  const node = {
    ...frontmatter,
    children: [],
    id: frontmatter.name,
    slug,
    sku: slug,
    title: frontmatter.name,
    parent: oldNode.id,
    thumbnails: _.reduce(frontmatter.thumbnails, createSrcset, {}),
    images: _.reduce(frontmatter.images, createSrcset, {}),
    internal: {
      type: 'JAMProduct',
    },
  };
  node.internal.contentDigest = crypto
    .createHash('md5')
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
