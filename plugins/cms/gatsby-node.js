const fs = require('fs-extra');
const path = require('path');
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

// add admin page to gatsby routes
exports.createPages = ({ boundActionCreators: { createPage } }) => {
  const filePath = require.resolve('./Admin.jsx');
  log('creating admin pages: ', filePath);
  createPage({
    path: '/admin',
    component: filePath,
    layout: 'AdminLayout',
  });
};

// add admin layout for admin page
// this prevents use defined default layout from messing with admin page
exports.createLayouts = ({ boundActionCreators: { createLayout } }) => {
  const filePath = require.resolve('./AdminLayout.jsx');
  log('creating admin layout: ', filePath);
  createLayout({
    component: filePath,
  });
};

// this is our entrypoint in development
// gatsby currently does not have a way to run something at the end of
// developemnt script (when the server is ready to accept req's)
exports.sourceNodes = copyCmsFiles;
// this copies our files over after everything else has built
exports.onPostBuild = copyCmsFiles;
