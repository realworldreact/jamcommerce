const fs = require('fs-extra');
const path = require('path');
// const chokidar = require('chokidar');
const debug = require('debug');

const cwd = process.cwd();
// will this work for all npm installs?
// is this brittle?
const cmsPath = path.join(cwd, 'node_modules/netlify-cms/dist');
const cmsFileExt = [
  '.js',
  '.map',
  '.css',
  '.woff',
  '.woff2',
  '.tff',
  '.eot',
  '.svg',
];

const publicPath = path.join(cwd, '/public');

const log = debug('jam:plugins:cms');

function fileFilter(file) {
  return cmsFileExt.some(ext => path.extname(file) === ext);
}
function copyCmsFiles() {
  log('copying cms files');
  return fs.ensureDir(publicPath).then(() => fs.readdir(cmsPath)).then(files =>
    Promise.all(
      files.map(file =>
        fs.copy(path.join(cmsPath, file), path.join(publicPath, file), {
          filter: fileFilter,
        }),
      ),
    ),
  );
}
exports.createPages = ({ boundActionCreators: { createPage } }) => {
  const filePath = require.resolve('./Admin.jsx');
  log('creating admin pages: ', filePath);
  createPage({
    path: '/admin',
    component: filePath,
    layout: 'AdminLayout',
  });
};

exports.createLayouts = ({ boundActionCreators: { createLayout } }) => {
  const filePath = require.resolve('./AdminLayout.jsx');
  log('creating admin layout: ', filePath);
  createLayout({
    component: filePath,
  });
};

exports.sourceNodes = copyCmsFiles;
exports.onPostBuild = copyCmsFiles;
